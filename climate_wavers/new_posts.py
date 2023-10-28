# new_posts.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

@async_to_sync
async def send_new_post_notification(user_id, post_id):
    # Logic to send a new post notification to the user with ID user_id
    # This can include creating a notification message and sending it to the user's channel
    # Usage
    notification_message = {
        'type': 'new_post_notification',
        'message': f'A new post (ID: {post_id}) has been created.',
    }
    user_channel_name = f"user_{user_id}"
    await channel_layer.send(user_channel_name, notification_message)

