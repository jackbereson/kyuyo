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
    
    public partial class KY_OVERTIME_TOTAL
    {
    		[Key()]
    	    public int ID { get; set; }
    	    public int WORKING_TIME_ID { get; set; }
    	    public decimal OT_HOURS_PROB { get; set; }
    	    public decimal OT_HOURS_OFFI { get; set; }
    	    public int OT_TYPE { get; set; }
    	    public Nullable<System.DateTime> CREATED_DT { get; set; }
    	    public string CREATED_BY { get; set; }
    	    public Nullable<System.DateTime> UPDATED_DT { get; set; }
    	    public string UPDATED_BY { get; set; }
    }
}
