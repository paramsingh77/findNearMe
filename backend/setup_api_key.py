#!/usr/bin/env python3
"""
Setup script for Google Places API key configuration
"""

import os
import re

def update_api_key():
    """Update the API key in app.py"""
    
    print("=== Google Places API Key Setup ===")
    print("\nTo get a Google Places API key:")
    print("1. Go to https://console.cloud.google.com/")
    print("2. Create a new project or select existing one")
    print("3. Enable Places API: APIs & Services > Library > Places API")
    print("4. Create API key: APIs & Services > Credentials > Create Credentials > API Key")
    print("5. Enable billing (required): Billing > Link billing account")
    print("   (Google offers $200 free credit for new users)")
    print("\n" + "="*50)
    
    api_key = input("\nEnter your Google Places API key: ").strip()
    
    if not api_key:
        print("No API key provided. Using placeholder.")
        return
    
    # Validate API key format (basic check)
    if not api_key.startswith('AIza'):
        print("Warning: API key doesn't start with 'AIza'. Please check your key.")
        proceed = input("Continue anyway? (y/n): ").lower()
        if proceed != 'y':
            return
    
    # Read the app.py file
    with open('app.py', 'r') as f:
        content = f.read()
    
    # Replace the API key
    pattern = r"API_KEY = os\.getenv\('GOOGLE_PLACES_API_KEY', '[^']*'\)"
    replacement = f"API_KEY = os.getenv('GOOGLE_PLACES_API_KEY', '{api_key}')"
    
    if pattern in content:
        new_content = re.sub(pattern, replacement, content)
        
        # Write back to file
        with open('app.py', 'w') as f:
            f.write(new_content)
        
        print(f"\n✅ API key updated successfully!")
        print(f"Key: {api_key[:10]}...{api_key[-4:]}")
        
    else:
        print("❌ Could not find the API_KEY line in app.py")
        print("Please manually update the API_KEY variable in app.py")

if __name__ == "__main__":
    update_api_key() 