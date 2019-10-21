const fs = require('fs');

const lighthouseResults = JSON.parse(fs.readFileSync('./lighthouse-results.json').toString());

let failedRun = false;

function assertTruthy(test, message) {
  if (!test) {
    console.error(`🚫  ${message}`);
    failedRun = true;
  }
}

function assertGreater(source, threshold, sourceName) {
  assertTruthy(source >= threshold, `${sourceName} was too low. Expected >= ${threshold}, but was ${source}. `)
}

function assertLess(source, threshold, sourceName) {
  assertTruthy(source <= threshold, `${sourceName} was too high. Expected <= ${threshold}, but was ${source}. `)
}

assertTruthy(lighthouseResults, 'Unable to parse lighthouse results.');
assertGreater(lighthouseResults.categories.performance.score, 0.8, `Performance score`);
assertGreater(lighthouseResults.categories.pwa.score, 0.6, `PWA score`);
assertGreater(lighthouseResults.categories.accessibility.score, 0.7, `Accessibility score`);
assertGreater(lighthouseResults.categories.seo.score, 1, `SEO score`);
assertGreater(lighthouseResults.categories['best-practices'].score, .9, `Best practices score`);
assertLess(lighthouseResults.audits['first-contentful-paint'].numericValue, 4000, `First contentful paint score`);
assertTruthy(lighthouseResults.runWarnings.length === 0, `Run Warnings: ${JSON.stringify(lighthouseResults.runWarnings)}`);

if (!failedRun) {
  console.log('🚀  Lighthouse audit passed. ');
} else {
  process.exit(1);
}
