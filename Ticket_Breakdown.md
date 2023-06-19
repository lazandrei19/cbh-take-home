# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Task 1: Create custom agent id mapping table

- Details: Facilities should be able to add their own custom IDs to each agent
- Acceptance Criteria: custom ids for each agent should be saved into the database

Implementation details:
1. A new table should be created to keep the custom agent IDs for each facility. It should have three columns: `facility_id`, `agent_id`, `custom_agent_id` with a primary key on `facility_id` and `agent_id`.
2. An API should be created to be able to link agent ids to custom agent ids. Optionally it should support batch processing, such as the Facility uploading a csv file with all the custom IDs
3. The frontend should be created to allow the input of such information.

Estimations: 5hrs for backend (3hrs if the batch functionality is implemented), 3hrs for frontend, 2hrs for testing

This task *could* be further broken down into its frontend and backend components

### Task 2: Add a new function to get the agent id mappings given a set of Shifts

- Description: A new function needs to be implemented that is to be called between `getShiftsByFacility` and `generateReport` that will annotate each of the Shifts with the custom id of the agent given by the facility (if one exists). Optionally, we should be informed if no such custom ids exist, as to not burden the final report with irrelevant highlights.
- Acceptance Criteria: Shifts should be annotated with the correct custom agent id (based on the facility and if they exist).

Implementation details:
1. Given a list of Shifts, this function should make a call to the database to fetch all of the custom ids for the shifts
2. The function should then annotate the Agent metadata to note this custom id.
3. (Optional) Also return if there were any custom ids for the optional step in Task 3

Estimations: 3hrs for backend, 1hr for testing (2hrs with the optional item)
Dependencies: Task 1

### Task 3: Modify the `generateReport` so that the new annotations are taken into account

- Description: The final report should have the new custom ids for all of the agents that have custom ids. If no custom id was given for an agent, we *may* use the internal id as before, but this should be made clear to the user (This should also be discussed with the users to see what they would like us to do).
- Acceptance Criteria: The reports should have the expected custom ids, or make it clear if no such id was provided

Implementation details:
1. Modify the `generateReport` to check for the existance of the annotations. If no such annotations are present, then the original ID can be used, but this fact needs to be highlighted
2. (Optional) If there are no custom ids in the whole report, there is no reason to highlight all of the shifts as not having a custom id.

Estimations: 5hrs for backend, 3hr for testing
Dependencies: Task 2