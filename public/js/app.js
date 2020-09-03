/**
 * This frontend JS file does four things:
 * 
 * 1. Authenticate and store token in local storage or somewhere
 * 2. Call for a report
 * 3. Get the status of the report
 * 4. Render the report data
 * 
 * It is assumed that jQuery is in scope.
 * 
 * I like to use functional style wherever possible.
 */

(function() {

$(document).ready(function() {
   refreshDashboard();
});

const refreshDashboard = function() {
   $.getJSON("/report", function(resp) {
      console.log(resp)
      const jobId = resp.job_id; // assignment for visibility

      setTimeout(getReport.bind(null, jobId), 5000); // should be customisable
   });
}

// Ensures errors will appear at the top regardless
const priorityForStatusCodes = {
   500: -100,
   200: 1,
   404: 50,
   501: 99
}

const sortReport = function(report) {
   const sr = report.service_reports;
   sr.sort(function(val1, val2) { // ugh, sort in place?
      return priorityForStatusCodes[val1.status_code] > priorityForStatusCodes[val2.status_code];
   });
   return sr;
}

const getReport = function(id) {
   $.getJSON("/report/" + id, function(resp) {  
      renderReport(sortReport(resp));
      $("#loading").fadeOut(); // only needs to happen once, but no harm here in not having a tracking variable
      setTimeout(refreshDashboard, 30000) // Update every 30s
   });
}

// Templates done in raw form in JS to save time. Wouldn't normally do it this way.
// I prefer the way react does it, and for it to be functional.

const classesForStatusCode = {
   200: "success",
   500: "danger",
   501: "secondary",
   "__UNKNOWN__": "danger"
};

const classesForState = {
   green: "success",
   red: "danger",
   "__UNKNOWN__": "secondary"
}

const defaultOpenForState = {
   500: "open",
   "__UNKNOWN__": ""
}

const graphMessage = function(message) {
   const percent = message.match(/(\d+(?:\.\d+)?)%/);
   if (percent) {
      return $('<div class="progress mt-0 mx-4 mb-4" style="width:400px"><div class="progress-bar bg-success" style="width: ' + Math.round(percent[1]) + '%">' + percent[1] + '%</div></div>');
   }
   return $('');
}

const renderReport = function(resp) {
   const rows = $("<div></div>");
   $.each(resp, function(i, value) { // would rather use Array.prototypes here but... IE
      if (value.nodes.length === 0) {
         return;
      }
      const row = $('<details ' + defaultOpenForState[value.status_code] + '><summary class="text-' + classesForStatusCode[value.status_code || "__UNKNOWN__"] + '">' + value.host.name + '</summary></details>')
      $.each(value.nodes, function(i, node) {
         const nodeRow = $('<div class="mx-2 text-' + classesForStatusCode[node.status_code || "__UNKNOWN__"] + '">' + node.web_node + ': ' + node.status_text + '</div>')
         $.each(node.checks, function(i, check) {
            const checkRow = $('<div class="mx-2 text-' + classesForState[check.state || "__UNKNOWN__"] + '"><p>' + check.name + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;<strong>' + check.message + '</strong></div>');
            checkRow.append(graphMessage(check.message));
            nodeRow.append(checkRow);
         });
         row.append(nodeRow);
      });
      rows.append(row);
   });
   $("#reportdata").html(rows);
}


})();