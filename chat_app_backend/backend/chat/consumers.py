import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        request_user = self.scope['user']
        if request_user.is_authenticated:
            chat_with_user = self.scope['url_route']['kwargs']['id']
            user_ids = [int(request_user.id), int(chat_with_user)]
            user_ids = sorted(user_ids)
            self.room_group_name = f"chat_{user_ids[0]}-{user_ids[1]}"
            
            # Store the current user's ID
            self.user_id = request_user.id
            
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender_id": self.user_id
            }
        )
    
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        
        await self.send(text_data=json.dumps({
            "message": message,
            "sender_id": sender_id
        }))