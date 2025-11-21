// Example: Using Native Features in Your Mobile App
// Import these functions in your components where needed

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

// ======================
// 1. CAMERA - Upload Photos
// ======================
export const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    // Returns base64 string you can upload to your server
    return `data:image/jpeg;base64,${image.base64String}`;
  } catch (error) {
    console.error('Camera error:', error);
    return null;
  }
};

// Pick from gallery
export const pickImage = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    return `data:image/jpeg;base64,${image.base64String}`;
  } catch (error) {
    console.error('Gallery error:', error);
    return null;
  }
};

// ======================
// 2. GEOLOCATION - Get User Location
// ======================
export const getCurrentLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  } catch (error) {
    console.error('Location error:', error);
    return null;
  }
};

// Request location permissions
export const requestLocationPermission = async () => {
  try {
    const permission = await Geolocation.requestPermissions();
    return permission.location === 'granted';
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

// ======================
// 3. PUSH NOTIFICATIONS - Order Updates
// ======================
export const initPushNotifications = async () => {
  try {
    // Request permission
    const permission = await PushNotifications.requestPermissions();
    
    if (permission.receive === 'granted') {
      await PushNotifications.register();
    }

    // Listen for registration
    PushNotifications.addListener('registration', (token) => {
      console.log('Push token:', token.value);
      // Send this token to your backend
      // sendTokenToServer(token.value);
    });

    // Listen for push notifications
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received:', notification);
      // Handle notification while app is open
    });

    // Handle notification tap
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push action performed:', notification);
      // Navigate to order details, etc.
    });

  } catch (error) {
    console.error('Push notification error:', error);
  }
};

// ======================
// 4. LOCAL NOTIFICATIONS - Order Status
// ======================
export const showOrderNotification = async (orderNumber, message) => {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: `Order #${orderNumber}`,
          body: message,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000) }, // Show after 1 second
          sound: 'default',
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  } catch (error) {
    console.error('Local notification error:', error);
  }
};

// Example: Notify when order is confirmed
export const notifyOrderConfirmed = (orderNumber) => {
  showOrderNotification(
    orderNumber,
    'Your order has been confirmed! We\'re preparing your delicious food.'
  );
};

// Example: Notify when order is ready
export const notifyOrderReady = (orderNumber) => {
  showOrderNotification(
    orderNumber,
    'Your order is ready for pickup/delivery!'
  );
};
