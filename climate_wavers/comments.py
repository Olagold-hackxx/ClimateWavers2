# comments.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

@async_to_sync
async def send_comment_notification(user_id, post_id, comment_id):
    # Logic to send a comment notification to the user with ID user_id
    # Usage
    notification_message = {
        'type': 'new_comment_notification',
        'message': f'A new comment (ID: {comment_id}) on your post (ID: {post_id}).',
    }
    user_channel_name = f"user_{user_id}"
    await channel_layer.send(user_channel_name, notification_message)

