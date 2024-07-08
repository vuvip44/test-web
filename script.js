// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAX6peBgQ-Su9k0sE2232f5eKU3Mq51eNE",
    authDomain: "datn-89d8d.firebaseapp.com",
    databaseURL: "https://datn-89d8d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "datn-89d8d",
    storageBucket: "datn-89d8d.appspot.com",
    messagingSenderId: "966015016684",
    appId: "1:966015016684:web:99fd59ea30dc865e624fc9"
  };

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Tham chiếu đến database
const database = firebase.database();

// Lấy các nút điều khiển
const lightToggle = document.getElementById('lightToggle');
const fanToggle = document.getElementById('fanToggle');

// Xử lý sự kiện cho đèn
lightToggle.addEventListener('click', () => {
    toggleDevice('light');
});

// Xử lý sự kiện cho quạt
fanToggle.addEventListener('click', () => {
    toggleDevice('fan');
});

// Hàm chuyển đổi trạng thái thiết bị
function toggleDevice(device) {
    const deviceRef = database.ref(device);
    deviceRef.once('value').then((snapshot) => {
        const currentState = snapshot.val();
        deviceRef.set(!currentState);
    });
}

// Lắng nghe sự thay đổi từ Firebase và cập nhật UI
function listenToDeviceChanges(device, button) {
    database.ref(device).on('value', (snapshot) => {
        const state = snapshot.val();
        button.textContent = state ? 'Tắt' : 'Bật';
        button.style.backgroundColor = state ? '#ff4136' : '#2ecc40';
    });
}

// Lắng nghe sự thay đổi cho cả đèn và quạt
listenToDeviceChanges('light', lightToggle);
listenToDeviceChanges('fan', fanToggle);