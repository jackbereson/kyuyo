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
    
    public partial class TB_M_DEPARTMENT
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public string DEPT_CD { get; set; }
    	    public string DEPT_NAME { get; set; }
    	    public string COMPANY_CD { get; set; }
    	    public string ACTIVE_FLAG { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    }
}