## Employee Info API

| Title            | Retrieve Employees			                                                                |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /api/employees                                                                           |
| Method           | _GET_                                                                                        |
| URL Params       | <ul><li> <code>id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> _id: [integer], <br> name : [string],<br> email : [string],<br> phone_number : [string]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Retrieve Employee by its id                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /api/employee/:id                                                                           |
| Method           | _GET_                                                                                        |
| URL Params       | <ul><li> <code>id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> _id: [integer], <br> name : [string],<br> email : [string],<br> phone_number : [string]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Save new employee                                                 |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /api/employee                                                                       |
| Method           | _POST_                                                                                        |
| URL Params       |                                     |
| Data Params      |  <pre> {<br> _id: [integer], <br> name : [string],<br> email : [string], <br> phone : [string] <br> } </pre>                  |
| Response         |  <pre> {<br> _id: [integer], <br> name : [string],<br> email : [string], <br> phone : [string] <br> } </pre> |
| Notes            | The template object will be the javascript object returned by the plugin. Click "show form json object" at the bottom of this page to see an example: http://selmanh.github.io/angularjs-form-builder/#/forms/create           |

<br>
<br>

| Title            | Update form template                                                                 |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /api/employee/:id                                                                           |
| Method           | _PUT_                                                                                        |
| URL Params       |    <ul><li> <code>id=[integer]<code> </li></ul>                                                          |
| Data Params      |    <pre> {<br> email : [string], <br> phone : [string] <br> } </pre>                          |
| Response         | <pre> {<br> _id: [integer], <br> name : [string],<br> email : [string], <br> phone : [string] <br> } </pre> |
| Notes            | Either email or phone can be updated. Even both can be updated at the same time. Only the name cannot be updated.                                                                                             |

<br>
<br>

| Title            | Delete form template                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /api/employee/:id                                                                           |
| Method           | _DELETE_                                                                                        |
| URL Params       | <ul><li> <code>id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> {<br> deleted :id<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>