# followers.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

@async_to_sync
async def send_follower_notification(user_id, follower_id):
    # Logic to send a follower notification to the user with ID user_id
    # Usage
    notification_message = {
        'type': 'new_follower_notification',
        'message': f'You have a new follower (ID: {follower_id}).',
    }
    user_channel_name = f"user_{user_id}"
    await channel_layer.send(user_channel_name, notification_message)

