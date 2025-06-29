# Facebook Marketplace Chat Archiver

Archive **all** your Marketplace chats in one click – no more manually clicking through dozens of threads.

> Works on [messenger.com/marketplace](https://www.messenger.com/marketplace) (desktop only)  
> Only processes threads visible in the DOM — script auto-scrolls to reach all of them

---

## Features

- Adds a floating **"Archive ALL"** button to your Messenger Marketplace inbox
- Automatically clicks the 3-dot menu and archives each thread
- Scrolls the list as needed — handles hundreds of chats
- Throttled to avoid Facebook rate-limits
- Easy to install & run with Tampermonkey

---

## Installation

1. **Install Tampermonkey**  
   [Chrome](https://tampermonkey.net/?ext=dhdg&browser=chrome) • [Firefox](https://tampermonkey.net/?ext=dhdg&browser=firefox)

2. **Install the script**  
   [Click here to install](https://github.com/YOUR_USERNAME/facebook-marketplace-chat-archiver/raw/main/fb-marketplace-archive.user.js)

3. **Go to** [messenger.com/marketplace](https://www.messenger.com/marketplace)

4. **Click “Archive ALL”**  
   The script will scroll through and archive every Marketplace thread it finds.

---

## How it works

- Facebook renders only ~25–30 chats at a time
- This script auto-scrolls the list to load more
- Each visible chat is archived via the same UI flow you'd use manually
- The script stops once it detects no more chats are loading
