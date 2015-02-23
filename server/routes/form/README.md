## Template API

| Title            | Retrieve Template by its id                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/template/:id                                                                           |
| Method           | _GET_                                                                                        |
| URL Params       | <ul><li> <code>id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> error: [string],<br> template_id : [integer],<br> company_id : [integer],<br> template : [object]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Retrieve template by company's admin user id                                                                 |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/template/company/:id                                                                          |
| Method           | _GET_                                                                                        |
| URL Params       | <pre>  id=[integer]  </pre>                                                                     |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> error: [string],<br> template_id : [integer],<br> company_id : [integer],<br> template : [object]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Save new form template                                                 |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/template                                                                       |
| Method           | _POST_                                                                                        |
| URL Params       |                                     |
| Data Params      |  <pre> {<br> template : [object],<br> company_id : [integer] <br> } </pre>                  |
| Response         | <pre> { <br> error: [string],<br> template_id : [integer], <br> company_id : [integer],<br> template : [object]<br> } </pre> |
| Notes            | The template object will be the javascript object returned by the plugin. Click "show form json object" at the bottom of this page to see an example: http://selmanh.github.io/angularjs-form-builder/#/forms/create           |

<br>
<br>

| Title            | Update form template                                                                 |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/template                                                                           |
| Method           | _PUT_                                                                                        |
| URL Params       |                                                              |
| Data Params      |   <pre> {<br> template : [object], <br> template_id : [integer] <br> } </pre>                          |
| Response         | <pre> { <br> error: [string],<br> template_id : [integer], <br> company_id : [integer],<br> template : [object]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Delete form template                                                                  |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/template/:template_id                                                                           |
| Method           | _DELETE_                                                                                        |
| URL Params       | <ul><li> <code>template_id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> error: [string],<br> template_id : [integer],<br> company_id : [integer],<br> template : [object]<br> } </pre> |
| Notes            |                                                                                              |

<br>
<br>

| Title            | Save submitted form completed by patient              |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/patient/                                                                           |
| Method           | _POST_                                                                                        |
| URL Params       |                                                              |
| Data Params      | <pre> { <br> company_id : [integer],<br> form : [object]<br> } </pre>                         |
| Response         | <pre> { <br> error: [string], <br> _id : [integer], <br> form : [object], <br> firstName : [String], <br> lastName : [String], <br> email : [String], <br> admin_id : [integer], <br> date : [Date]<br> } </pre> |
| Notes            | This will be the object returned by the plugin when a patient submits a form, click "show form json object" at the bottom of this page to see an example: http://selmanh.github.io/angularjs-form-builder/#/forms/1/view            |

<br>
<br>

| Title            | Retrieve form submitted by patient by its form id                                                    |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/patient/:form_id                                                                          |
| Method           | _GET_                                                                                        |
| URL Params       | <ul><li> <code>form_id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> { <br> error: [string], <br> _id : [integer], <br> form : [object], <br> firstName : [String], <br> lastName : [String], <br> email : [String], <br> admin_id : [integer], <br> date : [Date]<br> } </pre>  |
| Notes            |                                                                                              |








| Title            | Retrieve forms submitted by patient using patient's name and/or email                                  |
|------------------|----------------------------------------------------------------------------------------------|
| URL              | /form/patient/:firstName:lastName:email                                     |
| Method           | _GET_                                                                                        |
| URL Params       | <ul><li> <code>form_id=[integer]<code> </li></ul>                                                             |
| Data Params      |                                                                                              |
| Response         | <pre> <br> [ <br> { <br> error: [string], <br> _id : [integer], <br> form : [object], <br> firstName : [String], <br> lastName : [String], <br> email : [String], <br> admin_id : [integer], <br> date : [Date]<br> }, <br> ... ] </pre> |
| Notes            |                                                                                              |