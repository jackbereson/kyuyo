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
    
    public partial class KY_SALARY_RESULT
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public int COMPANY_ID { get; set; }
    	    public string DEPT_CD { get; set; }
    	    public string EMPLOYEE_NO { get; set; }
    	    public string YEAR_MONTH { get; set; }
    	    public Nullable<decimal> HISTORY_NO { get; set; }
    	    public string YEAR_MONTH_RECEIVE { get; set; }
    	    public Nullable<System.DateTime> DATE_FROM { get; set; }
    	    public Nullable<System.DateTime> DATE_TO { get; set; }
    	    public Nullable<decimal> PROBATION_SALARY { get; set; }
    	    public Nullable<decimal> OFFICAL_SALARY { get; set; }
    	    public string SALARY_UNIT { get; set; }
    	    public Nullable<decimal> SALARY_ALLOWANCE_PIT { get; set; }
    	    public Nullable<decimal> HOURLY_PRICE_PROB { get; set; }
    	    public Nullable<decimal> HOURLY_PRICE_OFFI { get; set; }
    	    public Nullable<decimal> AMOUNT_DEDUCTED_PROB { get; set; }
    	    public Nullable<decimal> AMOUNT_DEDUCTED_OFFI { get; set; }
    	    public Nullable<decimal> AMOUNT_DEDUCTED_SUMARY { get; set; }
    	    public Nullable<decimal> OT_SUMARY { get; set; }
    	    public Nullable<decimal> TOTAL_AMOUNT { get; set; }
    	    public Nullable<decimal> MEMBER_FEE { get; set; }
    	    public string STATUS { get; set; }
    	    public Nullable<decimal> LATE_NIGHT_ALLOWANCE_PROB { get; set; }
    	    public Nullable<decimal> LATE_NIGHT_ALLOWANCE_OFFI { get; set; }
    	    public Nullable<decimal> SOCIAL_INSU_AMOUNT { get; set; }
    	    public Nullable<decimal> HEALTH_INSU_AMOUNT { get; set; }
    	    public Nullable<decimal> UMEMPLOYEE_INSU_AMOUNT { get; set; }
    	    public Nullable<decimal> INCOME_BEFORE_TAX { get; set; }
    	    public Nullable<decimal> OT_NOT_PIT { get; set; }
    	    public Nullable<decimal> FAMILY_ALLOWANCES { get; set; }
    	    public Nullable<decimal> TAX_INCOME { get; set; }
    	    public Nullable<decimal> CAL_TAX_INCOME { get; set; }
    	    public Nullable<decimal> PIT { get; set; }
    	    public Nullable<decimal> NOT_INCLUDED_TAX_INCOME { get; set; }
    	    public Nullable<decimal> TOTAL_PAY { get; set; }
    	    public string APP_FLG { get; set; }
    	    public Nullable<decimal> SEVERANCE_ALLOWANCE { get; set; }
    	    public Nullable<System.DateTime> START_DT_CAL_SAL { get; set; }
    	    public Nullable<System.DateTime> END_DT_CAL_SAL { get; set; }
    	    public Nullable<decimal> OT_ALLOWANCE { get; set; }
    	    public Nullable<decimal> OTHER { get; set; }
    	    public string OTHER_UNIT { get; set; }
    	    public string OTHER_REMARK { get; set; }
    	    public Nullable<decimal> SABBTICAL_100 { get; set; }
    	    public Nullable<decimal> SABBTICAL_300 { get; set; }
    	    public Nullable<decimal> AMOUNT_SABBTICAL_100 { get; set; }
    	    public Nullable<decimal> AMOUNT_SABBTICAL_300 { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    }
}
