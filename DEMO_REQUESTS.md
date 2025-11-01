# Demo Requests Storage

## How Demo Requests Are Stored

All demo requests submitted through the "Request Demo" button are stored in the browser's `localStorage` under the key `"demoRequests"`.

## Data Structure

Each demo request is stored as an object with the following structure:

```json
{
  "id": "timestamp",
  "name": "User Name",
  "email": "user@example.com",
  "phone": "1234567890",
  "businessType": "driver|vendor|agent|fleet|other",
  "message": "Optional message",
  "isDemoRequest": true,
  "submittedAt": "2025-01-XX..."
}
```

## Accessing Demo Requests

### Via Browser Console

1. Open browser developer tools (F12)
2. Go to the Console tab
3. Run the following command:

```javascript
// Get all demo requests
const requests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
console.log(requests);

// Get count of demo requests
console.log(`Total demo requests: ${requests.length}`);

// Filter by business type
const driverRequests = requests.filter((r) => r.businessType === 'driver');
console.log(driverRequests);
```

### Programmatically in Code

```javascript
// Read demo requests
const demoRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');

// Add a new request (normally done by the modal)
const newRequest = {
  id: Date.now().toString(),
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  businessType: 'driver',
  message: 'Interested in demo',
  isDemoRequest: true,
  submittedAt: new Date().toISOString(),
};

const requests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
requests.push(newRequest);
localStorage.setItem('demoRequests', JSON.stringify(requests));
```

## Notes

- Demo requests are stored locally in the browser
- For production, this should be replaced with API calls to a backend database
- The `isDemoRequest: true` flag distinguishes demo requests from regular signups
- All phone numbers are normalized (non-digits removed)
