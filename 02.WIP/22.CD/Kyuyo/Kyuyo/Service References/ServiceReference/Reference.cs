﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Kyuyo.ServiceReference {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(Namespace="http://bap.poweregg.net/", ConfigurationName="ServiceReference.MailWS")]
    public interface MailWS {
        
        // CODEGEN: Parameter 'return' requires additional schema information that cannot be captured using the parameter mode. The specific attribute is 'System.Xml.Serialization.XmlElementAttribute'.
        [System.ServiceModel.OperationContractAttribute(Action="", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        [return: System.ServiceModel.MessageParameterAttribute(Name="return")]
        Kyuyo.ServiceReference.sendResponse send(Kyuyo.ServiceReference.sendRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="", ReplyAction="*")]
        System.Threading.Tasks.Task<Kyuyo.ServiceReference.sendResponse> sendAsync(Kyuyo.ServiceReference.sendRequest request);
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.6.1067.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://bap.poweregg.net/")]
    public partial class employeeDto : object, System.ComponentModel.INotifyPropertyChanged {
        
        private string corpIdField;
        
        private string empNumber1Field;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=0)]
        public string corpId {
            get {
                return this.corpIdField;
            }
            set {
                this.corpIdField = value;
                this.RaisePropertyChanged("corpId");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public string empNumber1 {
            get {
                return this.empNumber1Field;
            }
            set {
                this.empNumber1Field = value;
                this.RaisePropertyChanged("empNumber1");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.6.1067.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://bap.poweregg.net/")]
    public partial class resultStatus : object, System.ComponentModel.INotifyPropertyChanged {
        
        private string mainMessageField;
        
        private int mainStatusField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=0)]
        public string mainMessage {
            get {
                return this.mainMessageField;
            }
            set {
                this.mainMessageField = value;
                this.RaisePropertyChanged("mainMessage");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public int mainStatus {
            get {
                return this.mainStatusField;
            }
            set {
                this.mainStatusField = value;
                this.RaisePropertyChanged("mainStatus");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.6.1067.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://bap.poweregg.net/")]
    public partial class attachedFileWsDto : object, System.ComponentModel.INotifyPropertyChanged {
        
        private byte[] binaryField;
        
        private string fileNameField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="base64Binary", Order=0)]
        public byte[] binary {
            get {
                return this.binaryField;
            }
            set {
                this.binaryField = value;
                this.RaisePropertyChanged("binary");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public string fileName {
            get {
                return this.fileNameField;
            }
            set {
                this.fileNameField = value;
                this.RaisePropertyChanged("fileName");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="send", WrapperNamespace="http://bap.poweregg.net/", IsWrapped=true)]
    public partial class sendRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=0)]
        [System.Xml.Serialization.XmlElementAttribute("sendToEmployees", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Kyuyo.ServiceReference.employeeDto[] sendToEmployees;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=1)]
        [System.Xml.Serialization.XmlElementAttribute("copyToEmployees", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Kyuyo.ServiceReference.employeeDto[] copyToEmployees;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=2)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Kyuyo.ServiceReference.employeeDto senderEmployee;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=3)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string subject;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=4)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public string content;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=5)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public bool isSendToMobile;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=6)]
        [System.Xml.Serialization.XmlElementAttribute("attachments", Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Kyuyo.ServiceReference.attachedFileWsDto[] attachments;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=7)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public bool permitAddTarget;
        
        public sendRequest() {
        }
        
        public sendRequest(Kyuyo.ServiceReference.employeeDto[] sendToEmployees, Kyuyo.ServiceReference.employeeDto[] copyToEmployees, Kyuyo.ServiceReference.employeeDto senderEmployee, string subject, string content, bool isSendToMobile, Kyuyo.ServiceReference.attachedFileWsDto[] attachments, bool permitAddTarget) {
            this.sendToEmployees = sendToEmployees;
            this.copyToEmployees = copyToEmployees;
            this.senderEmployee = senderEmployee;
            this.subject = subject;
            this.content = content;
            this.isSendToMobile = isSendToMobile;
            this.attachments = attachments;
            this.permitAddTarget = permitAddTarget;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="sendResponse", WrapperNamespace="http://bap.poweregg.net/", IsWrapped=true)]
    public partial class sendResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://bap.poweregg.net/", Order=0)]
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public Kyuyo.ServiceReference.resultStatus @return;
        
        public sendResponse() {
        }
        
        public sendResponse(Kyuyo.ServiceReference.resultStatus @return) {
            this.@return = @return;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface MailWSChannel : Kyuyo.ServiceReference.MailWS, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class MailWSClient : System.ServiceModel.ClientBase<Kyuyo.ServiceReference.MailWS>, Kyuyo.ServiceReference.MailWS {
        
        public MailWSClient() {
        }
        
        public MailWSClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public MailWSClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MailWSClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MailWSClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        Kyuyo.ServiceReference.sendResponse Kyuyo.ServiceReference.MailWS.send(Kyuyo.ServiceReference.sendRequest request) {
            return base.Channel.send(request);
        }
        
        public Kyuyo.ServiceReference.resultStatus send(Kyuyo.ServiceReference.employeeDto[] sendToEmployees, Kyuyo.ServiceReference.employeeDto[] copyToEmployees, Kyuyo.ServiceReference.employeeDto senderEmployee, string subject, string content, bool isSendToMobile, Kyuyo.ServiceReference.attachedFileWsDto[] attachments, bool permitAddTarget) {
            Kyuyo.ServiceReference.sendRequest inValue = new Kyuyo.ServiceReference.sendRequest();
            inValue.sendToEmployees = sendToEmployees;
            inValue.copyToEmployees = copyToEmployees;
            inValue.senderEmployee = senderEmployee;
            inValue.subject = subject;
            inValue.content = content;
            inValue.isSendToMobile = isSendToMobile;
            inValue.attachments = attachments;
            inValue.permitAddTarget = permitAddTarget;
            Kyuyo.ServiceReference.sendResponse retVal = ((Kyuyo.ServiceReference.MailWS)(this)).send(inValue);
            return retVal.@return;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<Kyuyo.ServiceReference.sendResponse> Kyuyo.ServiceReference.MailWS.sendAsync(Kyuyo.ServiceReference.sendRequest request) {
            return base.Channel.sendAsync(request);
        }
        
        public System.Threading.Tasks.Task<Kyuyo.ServiceReference.sendResponse> sendAsync(Kyuyo.ServiceReference.employeeDto[] sendToEmployees, Kyuyo.ServiceReference.employeeDto[] copyToEmployees, Kyuyo.ServiceReference.employeeDto senderEmployee, string subject, string content, bool isSendToMobile, Kyuyo.ServiceReference.attachedFileWsDto[] attachments, bool permitAddTarget) {
            Kyuyo.ServiceReference.sendRequest inValue = new Kyuyo.ServiceReference.sendRequest();
            inValue.sendToEmployees = sendToEmployees;
            inValue.copyToEmployees = copyToEmployees;
            inValue.senderEmployee = senderEmployee;
            inValue.subject = subject;
            inValue.content = content;
            inValue.isSendToMobile = isSendToMobile;
            inValue.attachments = attachments;
            inValue.permitAddTarget = permitAddTarget;
            return ((Kyuyo.ServiceReference.MailWS)(this)).sendAsync(inValue);
        }
    }
}
