export { Base } from './Base';

// Public Pages
import * as Public from './Public';
export { Public }

// Client Pages
import * as Client from './Client';
export { Client }

// Admin Pages
// - Admin Dashboard
export { AdminDashboard } from './Admin/AdminDashboard';
// - Admin Clients
import * as AdminClient from './Admin/Clients';
export { AdminClient }
// - Admin Orders
import * as AdminOrder from './Admin/Orders';
export { AdminOrder }
// - Admin Events
import * as AdminEvent from './Admin/Events';
export { AdminEvent }
// - Admin Photo Sizes
import * as AdminPhotosize from './Admin/PhotoSizes';
export { AdminPhotosize }