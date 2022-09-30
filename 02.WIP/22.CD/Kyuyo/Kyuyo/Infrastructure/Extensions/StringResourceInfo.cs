using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Web;

namespace Kyuyo.Infrastructure.Extensions
{
    public class StringResourceInfo
    {
        private CultureInfo invariantCulture;
        
        public StringResourceInfo(ResourceManager manager, string rootNamespace = null)
        {
            if (manager == null)
            {
                throw new ArgumentNullException("manager");
            }
            this.ResourceManager = manager;
            this.RootNamespace = rootNamespace ?? "";
            this.invariantCulture = CultureInfo.InvariantCulture;
        }

        public ResourceManager ResourceManager { get; private set; }

        public string RootNamespace { get; private set; }

        internal ResourceSet GetResourceSet(string resourceName, CultureInfo culture, bool tryRoot)
        {
            if (string.IsNullOrWhiteSpace(resourceName))
            {
                return null;
            }
            var fullName = this.RootNamespace + "." + resourceName;
            if (this.ResourceManager.BaseName != fullName)
            {
                return null;
            }

            var target = culture;
            ResourceSet rs;
            while (true)
            {
                if (target.Name == this.invariantCulture.Name && !tryRoot)
                {
                    return null;
                }
                rs = this.ResourceManager.GetResourceSet(target, true, false);
                if (rs != null)
                {
                    return rs;
                }
                if (target.Name == this.invariantCulture.Name)
                {
                    return null;
                }
                target = target.Parent;
            }
        }
    }
}