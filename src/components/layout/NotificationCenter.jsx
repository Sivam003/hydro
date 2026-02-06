import React, { useState, useEffect } from 'react';
import { getNotifications, markAsRead, markAllAsRead } from '@/services/notificationService';
import { Bell, Droplets, Sprout, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const notificationIcons = {
  irrigation: <Droplets className="h-5 w-5 text-blue-500" />,
  germination: <Sprout className="h-5 w-5 text-green-500" />,
  fertilizer: <Zap className="h-5 w-5 text-yellow-500" />,
  info: <Bell className="h-5 w-5 text-gray-500" />,
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(getNotifications());

  const updateNotifications = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    window.addEventListener('notifications_updated', updateNotifications);
    return () => {
      window.removeEventListener('notifications_updated', updateNotifications);
    };
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  return (
    <Card className="w-80 border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-lg">Notifications</CardTitle>
        <Button variant="link" size="sm" onClick={handleMarkAllRead}>Mark all as read</Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              <Bell className="mx-auto h-12 w-12 opacity-50 mb-2" />
              You're all caught up!
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-4 border-b flex items-start gap-4 hover:bg-muted/50 ${!n.read ? 'bg-primary/5' : ''}`}>
                <div className="mt-1">{notificationIcons[n.type] || notificationIcons.info}</div>
                <div className="flex-1">
                  <p className={`font-semibold ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleString()}</p>
                </div>
                {!n.read && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => markAsRead(n.id)}>
                        <Check className="h-4 w-4" />
                    </Button>
                )}
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;