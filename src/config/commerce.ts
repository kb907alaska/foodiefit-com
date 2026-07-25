export const COMMERCE_CONFIG = {
  orderUrl: import.meta.env.PUBLIC_ORDER_URL || 'https://foodiefit.com/order/',
  accountUrl: import.meta.env.PUBLIC_ACCOUNT_URL || 'https://foodiefit.com/user/',
  corporateFormEndpoint: import.meta.env.PUBLIC_CORPORATE_FORM_ENDPOINT || '',
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'https://foodiefit.com',
  gaId: import.meta.env.PUBLIC_GA_ID || '',
  
  // Meal Prep Tech (MPT) API configuration
  mptApiKey: import.meta.env.PUBLIC_MEALPREP_CLIENT_KEY || 'ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==',
  mptApiHost: 'https://mptapi20170804072902.azurewebsites.net',
  
  // Cutoff & operational defaults
  nextDayCutoffTime: '18:00', // 6 PM
  deliveryDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  
  storeLocations: [
    {
      id: 'green-valley',
      name: 'Green Valley',
      slug: 'green-valley',
      address: '2185 E Windmill Ln #100',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89123',
      phone: '(702) 844-8848',
      hours: '8:00 AM – 8:00 PM',
      openHour: 8,
      closeHour: 20,
    },
    {
      id: 'summerlin',
      name: 'Summerlin',
      slug: 'summerlin',
      address: '4235 S Fort Apache Rd #220',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89147',
      phone: '(702) 844-8848',
      hours: '8:00 AM – 8:00 PM',
      openHour: 8,
      closeHour: 20,
    },
    {
      id: 'northwest',
      name: 'Northwest',
      slug: 'northwest',
      address: '7085 W Ann Rd #140',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89130',
      phone: '(702) 844-8848',
      hours: '8:00 AM – 8:00 PM',
      openHour: 8,
      closeHour: 20,
    }
  ]
};
