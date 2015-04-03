// ==UserScript==
// @name         Add readable time to Tempo Jira extension
// @namespace    https://github.com/GoZOo
// @version      0.1
// @description  Display readable hours minutes time to Tempo Jira extension
// @author       Fabien Clément
// @match        https://*.atlassian.net/secure/TempoUserBoard!timesheet.jspa*
// @match        https://*.atlassian.net/secure/TempoTeamBoard!timesheet.jspa*
// @updateURL    https://raw.githubusercontent.com/GoZOo/ReadableTempoJira/master/ReadableTempoJira.js
// @downloadURL  https://raw.githubusercontent.com/GoZOo/ReadableTempoJira/master/ReadableTempoJira.js
// @grant        none
// ==/UserScript==
(function( $ ) {
 
    $.fn.readableTempoJira = function() {
        
        var isNumber = function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        
        var convertToReadable = function(n) {
          n = Math.abs(n); // Change to positive
          var hours = Math.floor(n);
          var decimal = n - hours;
          var minutes = Math.round(60 * decimal);
          var readable = "";
            if (hours > 0) {
              readable = hours + "h";
            }
            if (minutes > 0) {
              if (hours > 0) {
                readable += " ";
              }
              readable += minutes + "min"
            }
            return readable;
        }
 
        return this.each(function() {
            var cell = $( this );
            var time_number = cell.text().trim();
            if (isNumber(time_number)) {
                var readable_time = convertToReadable(time_number);
                if (readable_time) {
                  cell.html(time_number + "<br />(" + readable_time + ")");
                }
            }
        });
 
    };
 
}( jQuery ));

jQuery(document).ready(function() {
  jQuery("td.value-cell").readableTempoJira();
  jQuery("td.hours").readableTempoJira();
  jQuery("table.total-work-bottom td").readableTempoJira();
  jQuery("table#issuetable > tfoot th").readableTempoJira();
});
