# Example Sonar Review Finding

`service/report/ReportFormatter.java` fails `quality-sonar` for the bounded
scope.

Evidence: the active Java quality profile reports a new Sonar issue for nested
conditional complexity in the export path.

Next step: flatten the branching or extract the decision logic into a cohesive
helper, then re-run the Sonar check for the bounded scope.
