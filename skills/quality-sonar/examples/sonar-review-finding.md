# Example Sonar Review Finding

Medium - `service/report/ReportFormatter.java`: the current change introduces a
new Sonar issue on the active Java quality profile for nested conditional
complexity in the export path. Flatten the branching or extract the decision
logic into a cohesive helper, then re-run the Sonar check for the bounded scope.
