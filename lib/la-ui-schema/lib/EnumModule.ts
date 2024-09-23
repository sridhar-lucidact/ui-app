export enum BootStrapColSize { 
    col = 1,
    col_1 = 1,
    col_2 = 2,
    col_3 = 3,
    col_4 = 4,
    col_5 = 5,
    col_6 = 6,
    col_7 = 7,
    col_8 = 8,
    col_9 = 9,
    col_10 = 10,
    col_11 = 11,
    col_12 = 12
 }; 

export enum EventActionType {
    APICall='APICall',  
    Bookmark='Bookmark',  
    Dialog='Dialog',
    Function='Function',
    InjectForm = 'InjectForm',
    MergeForm = 'MergeForm',
    NewWindow='NewWindow',
    PatientTab='PatientTab',
    Redirect='Redirect',
    Refresh='Refresh'
}

export enum EventType {
    OnActiveTab='onActiveTab',
    OnBlur='onBlur',
    OnCellClick='onCellClick',
    OnCellDoubleClick='onCellDoubleClick',
    OnChange='onChange',
    OnClick='onClick',
    OnClose='onClose',
    OnDelete='onDelete',
    OnExpand='onExpand',
    OnFocus='onFocus',
    OnGridPageChange='onGridPageChange',
    OnLoad='onLoad',
    OnKeydown='onKeyDown',
    OnKeyup='onKeyUp',
    OnPrevious='onPrevious',
    OnNext='onNext',
    OnRefresh='onRefresh',    
    OnRowClick='onRowClick',    
    OnPointClick='onPointClick',
    OnSelect='onSelect',
    OnSubmit='onSubmit'    
}

export enum FieldType {
    AmericanAddress='AmericanAddress',    
    AutoFill='AutoFill',
    AutoFillMulti='AutoFillMulti',
    Avatar='Avatar',
    Button='Button',
    ChatControl='ChatControl',
    CheckBox='CheckBox',
    Currentcy='Currentcy',
    DateField='DateField',
    Decimal='Decimal',
    DropDown='DropDown',
    DropDownMultiSelect='DropDownMultiSelect',
    FileUpload='FileUpload',
    Graph='Graph',
    Image='Image',
    Email='Email',
    Hyperlink='Hyperlink',
    Password='Password',
    Percentage='Percentage',
    Prgoress='Prgoress',
    Phone='Phone',
    Radio='Radio',
    Reset='Reset',
    Switch='Switch',
    TagEntity='TagEntity',
    TagWord='TagWord',    
    Text='Text',
    TextArea='TextArea',
    ViewField='ViewField',
    WholeNumber='WholeNumber',
    WorldAddress='WorldAddress'
}

export enum FormType {    
    Editable='Editable',
    Graph='Graph',
    List='List',
    View='View'
}

export enum HttpMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

export enum LabelAlign {
    Horizontal = 'horizontal',
    Vertical = 'vertical'
}

export enum PageType {
    Admin = 'Admin',
    Clinic = 'Clinic',
    Patient = 'Patient',
    SuperAdmin = 'SuperAdmin'
}

export enum PatientStatus {
    Active = 'Active',
    InActive = 'InActive'
}

export enum RowSize { 
    row_1 = 1,
    row_2 = 2,
    row_3 = 3,
    row_4 = 4,
    row_5 = 5,
    row_100 = 100
 };

export enum WidgetType {
    Add='Add',
    Desc='Desc',
    Editable='Editable',
    Graph='Graph',
    Info='Info',
    List='List',
    View='View',
    Wizard='Wizard'
}
