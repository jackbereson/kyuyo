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
    
    public partial class KY_WORKINGTIME_TOTAL
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public string EMPLOYEE_NO { get; set; }
    	    public string YEAR_MONTH { get; set; }
    	    public string FROM_DATE { get; set; }
    	    public string TO_DATE { get; set; }
    	    public decimal STD_WORK_HOUR { get; set; }
    	    public decimal PROB_DAYS { get; set; }
    	    public decimal OFFI_DAYS { get; set; }
    	    public decimal WORKING_TIME { get; set; }
    	    public decimal ABSENCE { get; set; }
    	    public decimal PROB_ABSENCE { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    }
}