# Stitch front-end development technical assessment

This repository contains a basic Next.js app that displays information about some patients. The current code contains the layout, styling and dummy information.

There are two sections to the assessment. In section 1 you will build out the app by adding data loading and some interaction. If you have time remaining, in section 2 you will choose from a list of additional features to implement.

Throughout your work you should add automated tests to ensure your code behaves as you expect, and sufficient comments to help other developers understand it.

You may make use of any third-party packages, so long as they are added to the package.json file as normal. Feel free to use google, stack overflow and any similar resources as necessary.

To finish the assessment you should push your code to github, in a new branch, and submit a pull request to merge it to main.

## Section 1: Data and interaction

The app needs to load its data from a remote source instead of having it hardcoded. There is an API routes you can use for this within the next.js app available at http://localhost:3000/api/patients.

You should also allow the user to sort the table by each column, by selecting from a dropdown menu - e.g. they would select "Name" from the dropdown to put the table in alphabetical order by name.

## Section 2: Additional features

If you have completed section 1 and still have time remaining, then select one or more of the following features and add them to the codebase:

* Improve the styling so that the table is easy to read
* Add another interaction so that when the user clicks on a patient they are taken to a new page that displays that patient's name, date of birth and favourite colour
* Add conditional formatting so that patients who were born before 1st January 1960 are displayed in a different colour
* Add a text input box where the user can enter a name, and filter the table contents to match that name

We would prefer you to do one or two well than rush through all of them. Note that some are expected to take longer than others, so bear that in mind when making your choice.
