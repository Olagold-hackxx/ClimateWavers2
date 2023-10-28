from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from climate_wavers.consumers import YourConsumer  # Import your consumer class

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r"ws/notifications/", YourConsumer.as_asgi()),  # Define your WebSocket path
        ]),
    ),
})
