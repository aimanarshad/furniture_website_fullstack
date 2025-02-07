### **Summary of Days 2-5 - E-commerce Furniture Website Development**

#### **Day 2: Marketplace Technical Foundation**
- **Business Goal**: Build an online furniture marketplace connecting local sellers and buyers with home delivery and easy access to quality furniture.
- **Frontend Requirements**:  
  - **Framework**: Next.js for scalability.  
  - **Styling**: Tailwind CSS for responsiveness and customization.
- **Backend**: Sanity CMS with custom schemas and GROQ queries for managing furniture listings and categories.
- **Third-Party APIs**:  
  - **Shipment**: Shipo and Express for tracking orders.  
  - **Payment Gateway**: APIs from Amazon, Daraz, etc.
- **API Endpoints**:  
  - `/products`: Fetch products.  
  - `/orders`: Create orders.  
  - `/shipment`: Track order status.  
  - `/customer`: Add/update customer info.  
  - `/payment`: Process payments.
- **Data Workflow**: User signs up, selects category, adds products to cart, saves order, and tracks shipment.

#### **Day 3: API Integration**
- **Sanity Integration**:  
  - Installed Sanity CMS, set up schemas, and used GROQ queries to fetch data.
  - Used `fetch` to pull data from a mock API.
  - Imported initial data into Sanity using a custom script.
- **Migration Steps**:  
  - Cloned GitHub repo, installed dependencies, created Sanity project, and set up environment variables.
  - Imported data and integrated with the Sanity CMS.
- **Schema Adjustments**: Updated properties like Name, Image, Price, Tags to new schema fields like Title, Description, Price, Discount Percentage, etc.

#### **Day 4: Dynamic Frontend Components**
- **Product Page**: Created a dynamic product page fetching products from Sanity.
- **Product Detail Page**: Implemented dynamic routing to show product details based on the product ID.
- **Add to Cart**: Integrated state management for add-to-cart functionality.
- **Search and Filter**: Added search by name, category, tags, and filter by price.
- **Checkout Page**: Developed a checkout page with payment and shipping details.
- **Sanity Data**: Customer and order data are stored in Sanity when a user checks out.
- **Order Tracking**: Integrated Shipo API for real-time tracking information.
- **Admin Panel**: Created an admin panel for product management and viewing customer orders.
- **User Info Page**: Developed a page to view user details and order history.

#### **Day 5: Finalizing Features & UI Enhancements**
- **Polished UI**: Refined user interface for a better shopping experience.
- **Responsive Design**: Ensured full responsiveness across devices using Tailwind CSS.
- **Order Confirmation**: Integrated email notifications for order confirmations.
- **Shipping Updates**: Finalized the integration with Shipo API for delivery tracking.
- **Admin Panel**: Enhanced admin functionality with analytics on orders and user activities.

---

#### **Day 6: Deploy on Vercel**
1. Prepare your project and ensure it works locally.  
2. Push your project to a GitHub repository.  
3. Sign up for a Vercel account at vercel.com.  
4. Click "New Project" on Vercel and link your GitHub account.  
5. Select your project repository from the list in Vercel.  
6. Add necessary environment variables in the Vercel dashboard.  
7. Ensure Vercel auto-detects the build settings (Next.js default settings).  
8. Click "Deploy" to start the build and deployment process.  
9. Once deployed, check your live project through the provided preview URL.  
10. Optionally, set up a custom domain in the Vercel dashboard.  