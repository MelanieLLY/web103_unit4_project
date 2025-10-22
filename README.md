# WEB103 Project 4 - Car malls stimulator

Submitted by: Liuyi Yang

About this web app: A React and Express web app for creating and managing customizable cars stored in a PostgreSQL database.

Time spent: 8 hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [ ]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
  - Implemented 4 customizable features: Exterior Color, Wheels Type, Interior Seats, and Engine Type
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
  - Color: Red, Blue, Black, White, Silver
  - Wheels: Standard, Sport, Premium
  - Interior: Cloth, Leather, Premium Leather
  - Engine: 4-Cylinder, V6, V8
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
  - Price breakdown updates in real-time showing current selections
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
  - Real-time price calculation with detailed breakdown of each feature's cost
  - Total price updates instantly when options change
- [x] **The visual interface changes in response to at least one customizable feature.**
  - Price display, feature labels, and validation messages update dynamically
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
  - Create Car page allows users to save custom configurations
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
  - Frontend and backend validation prevents incompatible combinations:
    - 4-Cylinder engine + Premium wheels (incompatible)
    - Cloth interior + Premium wheels (incompatible)
  - Error messages displayed before submission, submit button disabled
- [x] **Users can view a list of all submitted `CustomItem`s.**
  - View Cars page displays all custom cars in a table format
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
  - Edit button available in the list view for each car
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
  - Delete button available in the list view with confirmation dialog
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**
  - Detail page includes Edit Configuration and Delete Car buttons


The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission


The following **additional** features are implemented:


## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://github.com/MelanieLLY/web103_unit4_project/blob/main/hw04.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

## License

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.