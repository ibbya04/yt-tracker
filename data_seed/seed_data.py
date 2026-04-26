import os
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
import json
import yt_dlp

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    
DEAL_TYPE_MAPPINGS = {
    "Moonbug Entertainment": "Majority Investment",
    "Lunar X": "Majority Investment",
    "Candle Media": "Majority Investment",
    "Electrify Video Partners": "Minority Investment",
    "Spotter": "Back-catalog Licensing",
    "Jellysmack": "Back-catalog Licensing"
}

DEAL_SRC_MAPPINGS = {
    "Moonbug Entertainment": "https://www.moonbug.com",
    "Lunar X": "https://lunar-x.com",
    "Candle Media": "https://candlemedia.com",
    "Electrify Video Partners": "https://www.electrify.video/our-brands",
    "Spotter": "https://www.spotter.com",
    "Jellysmack": "https://jellysmack.com"
}

def get_channel_info(name):
    """Searches YouTube for a channel name and returns the ID using yt-dlp."""
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # search_url = f"ytsearch1:{name} channel" 
            # We search specifically for the channel to get the correct metadata
            info = ydl.extract_info(f"ytsearch1:{name}", download=False)
            if 'entries' in info and len(info['entries']) > 0:
                return info['entries'][0].get('channel_id')
    except Exception as e:
        print(f"Error finding ID for {name}: {e}")
    return None

def seed_data():
    # 1. Load the local file
    try:
        with open('data_seed.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("[ERROR] data_seed.json not found.")
        return
    
    for entry in data:
        firm_name = entry.get("firm_name")
        channels = entry.get("channels", [])
        
        # 1. Resolve Firm ID
        firm_res = supabase.table("firms").upsert({
            "name": firm_name
        }, on_conflict="name").execute()
        firm_id = firm_res.data[0]["id"]

        today = datetime.now().strftime("%Y-%m-%d")
        src_url = DEAL_SRC_MAPPINGS.get(firm_name, "https://google.com")
        deal_type = DEAL_TYPE_MAPPINGS.get(firm_name, "Unknown")

        print(f"\n--- Processing Firm: {firm_name} ---")


        for channel_name in channels:
            print(f"    Adding {channel_name} to {firm_name}...")
            print(f"    Searching for {channel_name}...")
            yt_id = get_channel_info(channel_name)
            
            if not yt_id:
                print(f"    [SKIP] Could not find ID for {channel_name}")
                continue

            # 2. Ensure Channel exists
            channel_data = supabase.table("channels").upsert({
                "yt_channel_id": yt_id,
                "channel_name": channel_name
            }, on_conflict="yt_channel_id").execute()
            channel_id = channel_data.data[0]["id"]

            deal_type = DEAL_TYPE_MAPPINGS.get(firm_name, "Majority Investment")
            src_url = DEAL_SRC_MAPPINGS.get(firm_name, "Unknown")

            # 3. Create the Deal link
            supabase.table("deals").upsert({
                "channel_id": channel_id,
                "firm_id": firm_id,
                "acquisition_date": today,
                "deal_type": deal_type,
                "source_url": src_url
            }, on_conflict="channel_id,firm_id").execute()
            
            print(f"    [OK] Added {channel_name}, ({yt_id}), {firm_name}, {deal_type}, {src_url}")

if __name__ == "__main__":
    if url and key:
        print('[OK] .env file loaded successfully')
        supabase: Client = create_client(url, key)
    else:
        print(f"[WARNING] .env file not found or keys not set")
        exit
    seed_data()