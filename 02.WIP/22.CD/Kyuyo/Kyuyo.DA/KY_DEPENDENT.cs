//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Kyuyo.DA
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    public partial class KY_DEPENDENT
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public string EMPLOYEE_NO { get; set; }
    	    public string DEPENDENT { get; set; }
    	    public Nullable<System.DateTime> BIRTH_DT { get; set; }
    	    public string NUMBER { get; set; }
    	    public string NUMBER_BOOK { get; set; }
    	    public string DEPENDENT_TAX_CODE { get; set; }
    	    public string IDENTITY_PASSPORT { get; set; }
    	    public string RELATIONSHIP { get; set; }
    	    public string NATIONALITY { get; set; }
    	    public string FROM_MONTH { get; set; }
    	    public string TO_MONTH { get; set; }
    	    public string DELETE_FLAG { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    	    public string REG_COUNTRY { get; set; }
    	    public string REG_CITY { get; set; }
    	    public string REG_DISTRICT { get; set; }
    	    public string REG_WARD { get; set; }
    	    public Nullable<int> MAIN_ID { get; set; }
    	    public Nullable<int> HISTORY_NO { get; set; }
    }
}
