event-tracker/
│
├── config/
│   ├── database.js                 # Database configuration
│   ├── email.js                    # Email configuration for nodemailer
│   └── puppeteer.js                # Puppeteer/Scraping configuration
│
├── logs/
│   └── app.log                     # Application logs for monitoring and debugging
│
├── models/
│   ├── event.js                    # Data model/schema for events
│   └── changeLog.js                # Data model/schema for change logs
│
├── scrapers/
│   ├── index.js                    # Consolidates all scraper logic
│   ├── tradeShowScraper.js         # Logic specific to scraping Trade Shows
│   └── conferenceScraper.js        # Logic specific to scraping Conferences
│
├── services/
│   ├── emailService.js             # Handles email sending logic
│   ├── scrapingService.js          # Interfaces with the scrapers
│   ├── eventService.js             # Business logic related to event handling
│   ├── reportService.js            # Logic for generating Excel reports
│   └── cronService.js              # Scheduling logic for regular scans
│
├── routes/
│   ├── events.js                   # Endpoints related to events
│   └── notifications.js            # Endpoints for manual notifications and checks
│
├── tests/
│   ├── scraper.test.js             # Tests for scraping logic
│   ├── eventService.test.js        # Tests for event handling and differentiation
│   └── notificationService.test.js # Tests for email notifications
│
├── utils/
│   ├── errorHandler.js             # Utility functions for handling errors
│   ├── eventDiffer.js              # Utility to find differences between events
│   └── logger.js                   # Utility for logging
│
├── public/
│   ├── css/                        # Stylesheets for any front-end
│   └── js/                         # Front-end JavaScript files
│
├── views/
│   ├── dashboard.ejs               # Front-end dashboard view (if using a template engine)
│   └── report.ejs                  # View to display generated reports
│
├── .env                            # Environment variables
├── .gitignore                      # Specifies files to ignore in version control
├── package.json                    # Node.js manifest file
├── README.md                       # Project documentation
└── server.js                       # Main application entry point
