#!/bin/bash

# Create directories
mkdir -p event-tracker/config
mkdir -p event-tracker/logs
mkdir -p event-tracker/models
mkdir -p event-tracker/scrapers
mkdir -p event-tracker/services
mkdir -p event-tracker/routes
mkdir -p event-tracker/tests
mkdir -p event-tracker/utils
mkdir -p event-tracker/public/css
mkdir -p event-tracker/public/js
mkdir -p event-tracker/views

# Create files
touch event-tracker/config/database.js
touch event-tracker/config/email.js
touch event-tracker/config/puppeteer.js
touch event-tracker/logs/app.log
touch event-tracker/models/event.js
touch event-tracker/models/changeLog.js
touch event-tracker/scrapers/index.js
touch event-tracker/scrapers/tradeShowScraper.js
touch event-tracker/scrapers/conferenceScraper.js
touch event-tracker/services/emailService.js
touch event-tracker/services/scrapingService.js
touch event-tracker/services/eventService.js
touch event-tracker/services/reportService.js
touch event-tracker/services/cronService.js
touch event-tracker/routes/events.js
touch event-tracker/routes/notifications.js
touch event-tracker/tests/scraper.test.js
touch event-tracker/tests/eventService.test.js
touch event-tracker/tests/notificationService.test.js
touch event-tracker/utils/errorHandler.js
touch event-tracker/utils/eventDiffer.js
touch event-tracker/utils/logger.js
touch event-tracker/views/dashboard.ejs
touch event-tracker/views/report.ejs
touch event-tracker/.env
touch event-tracker/.gitignore
touch event-tracker/package.json
touch event-tracker/README.md
touch event-tracker/server.js
