import { calculateDaysRemaining } from '@/lib/utils';
import * as plantService from '@/services/plantService';

const NOTIFICATION_KEY = 'hydroponic_notifications';

// --- Core Functions ---

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem(NOTIFICATION_KEY)) || [];
};

const saveNotifications = (notifications) => {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new CustomEvent('notifications_updated'));
};

// --- Service Functions ---

export const addNotification = (title, message, type = 'info') => {
  const notifications = getNotifications();
  const newNotification = {
    id: Date.now().toString(),
    title,
    message,
    type, // e.g., 'irrigation', 'germination', 'fertilizer'
    timestamp: new Date().toISOString(),
    read: false,
  };
  saveNotifications([newNotification, ...notifications]);
};

export const markAsRead = (id) => {
  let notifications = getNotifications();
  notifications = notifications.map(n => (n.id === id ? { ...n, read: true } : n));
  saveNotifications(notifications);
};

export const markAllAsRead = () => {
    let notifications = getNotifications();
    notifications = notifications.map(n => ({...n, read: true}));
    saveNotifications(notifications);
};

// --- Event Checking ---

// This function checks for time-based events and creates notifications.
export const checkSystemEvents = () => {
    const plants = plantService.getPlants();
    const notifications = getNotifications();

    plants.forEach(plant => {
        const transplantDays = calculateDaysRemaining(plant.transplantDate);
        // Check if today is transplant day
        if (transplantDays !== null && transplantDays === 0) {
            // Check if we haven't already sent this notification today
            const alreadyNotified = notifications.some(
                n => n.type === 'germination' && n.message.includes(plant.name) && new Date(n.timestamp).toDateString() === new Date().toDateString()
            );
            if (!alreadyNotified) {
                addNotification(
                    'Transplant Reminder',
                    `${plant.name} is ready to be moved from germination to the main system today.`,
                    'germination'
                );
            }
        }
    });
};