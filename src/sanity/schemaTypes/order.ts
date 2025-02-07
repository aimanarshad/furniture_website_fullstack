const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'order_date',
      title: 'Order Date',
      type: 'datetime',
      description: 'The date and time when the order was placed.',
    },
    {
      


      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      description: 'The customer who placed the order.',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'item',
          title: 'Item',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              description: 'Reference to the product being ordered.',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              description: 'The quantity of the product ordered.',
              
            },
          ],
        },
      ],
      description: 'List of items in the order.',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
      hidden: true,
    },
  ],
};

export default orderSchema;
