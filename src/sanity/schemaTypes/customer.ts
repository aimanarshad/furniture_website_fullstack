const customerSchema = {
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'lastName', type: 'string', title: 'LastName' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'address', type: 'text', title: 'Address' },
    { name: 'companyName', type: 'string', title: 'Company Name' },
    { name: 'country', type: 'string', title: 'Country' },
    { name: 'weight', type: 'string', title: 'Weight' },
    { name: 'addressTo', type: 'string', title: 'Address To' },
    { name: 'zipCode', type: 'string', title: 'ZIP Code' },
    { name: 'trackingNumber', type: 'string', title: 'Tracking Number' },
    { name: 'additionalInformation', type: 'text', title: 'Additional Information' },
  ],
};

export default customerSchema;
