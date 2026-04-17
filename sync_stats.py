import os
import logging
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from googleapiclient.discovery import build

# 1. Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

load_dotenv()

def sync_youtube_stats():
    # --- CREDENTIALS CHECK ---
    logger.info("Starting Sync Process...")
    
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    yt_key = os.environ.get("YOUTUBE_API_KEY")

    if not all([url, key, yt_key]):
        logger.error("Missing environment variables. Check your .env file!")
        return

    try:
        supabase: Client = create_client(url, key)
        youtube = build("youtube", "v3", developerKey=yt_key)
        logger.info("Successfully connected to Supabase and YouTube API.")
    except Exception as e:
        logger.error(f"Connection to API's failed: {e}")
        return

    # --- STEP 1: FETCH FROM SUPABASE ---
    logger.info("Fetching channel list from Supabase...")
    db_response = supabase.table("channels").select("yt_channel_id, channel_name").execute()
    channels = db_response.data
    
    if not channels:
        logger.warning("No channels found in the database. Nothing to sync.")
        return

    logger.info(f"Found {len(channels)} channels to update.")
    channel_ids = [c["yt_channel_id"] for c in channels]

    # Map for easy lookup later
    db_id_map = {c["yt_channel_id"]: c["channel_name"] for c in channels}
    channel_ids = list(db_id_map.keys())

    # --- STEP 2: FETCH FROM YOUTUBE ---
    logger.info(f"Requesting stats for {len(channel_ids)} channels from YouTube...")
    try:
        yt_request = youtube.channels().list(
            part="statistics,snippet",
            id=",".join(channel_ids)
        )
        yt_response = yt_request.execute()
        yt_items = yt_response.get("items", [])
        logger.info(f"Received data for {len(yt_items)} channels from YouTube.")
    except Exception as e:
        logger.error(f"YouTube API request failed: {e}")
        return
    
    found_ids = [item["id"] for item in yt_items]
    missing_ids = [id for id in channel_ids if id not in found_ids]
    
    for mid in missing_ids:
        logger.warning(f"⚠️ YouTube could not find ID: {mid} (DB Name: {db_id_map[mid]}). Check if ID is correct")

    # --- STEP 3: UPDATE SUPABASE ---
    update_count = 0
    error_count = 0

    for item in yt_items:
        yt_id = item["id"]
        title = item["snippet"]["title"]
        stats = item["statistics"]
        
        # Prepare the data object
        update_payload = {
            "subscriber_count": int(stats.get("subscriberCount", 0)),
            "total_views": int(stats.get("viewCount", 0)),
            "thumbnail_url": item["snippet"]["thumbnails"].get("high", {}).get("url"),
            "last_api_update": datetime.now().isoformat()
        }

        try:
            # Update the specific row
            supabase.table("channels").update(update_payload).eq("yt_channel_id", yt_id).execute()
            logger.info(f"  → UPDATED: {title} ({yt_id})")
            update_count += 1
        except Exception as e:
            logger.error(f"  → FAILED to update {title}: {e}")
            error_count += 1

    # --- SUMMARY ---
    logger.info("--- SYNC COMPLETE ---")
    logger.info(f"Successfully Updated: {update_count}")
    logger.info(f"Errors encountered: {error_count}")
    logger.info("----------------------")

if __name__ == "__main__":
    sync_youtube_stats()