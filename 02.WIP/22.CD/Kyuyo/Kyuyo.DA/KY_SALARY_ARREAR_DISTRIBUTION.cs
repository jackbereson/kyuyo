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
    
    public partial class KY_SALARY_ARREAR_DISTRIBUTION
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public string EMPLOYEE_NO { get; set; }
    	    public string YEAR_MONTH { get; set; }
    	    public decimal INCOME { get; set; }
    	    public decimal DISTRIBUTION_AMOUNT { get; set; }
    	    public decimal DISTRIBUTION_MONTH { get; set; }
    	    public decimal REST_AMOUNT { get; set; }
    	    public decimal NUMBER_MONTHS { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    }
}