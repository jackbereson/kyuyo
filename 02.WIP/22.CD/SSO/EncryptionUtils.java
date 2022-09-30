package com.mitani.l2.usersession.poweregg;
////import javax.crypto.Cipher;
//import javax.crypto.spec.SecretKeySpec;
//
//
//public class EncryptionUtils {
//	public static String encrypt(String input, String key) {
//		byte[] crypted = null;
//		try {
//		
//			SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");
//			
//			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
//			cipher.init(Cipher.ENCRYPT_MODE, skey);
//			crypted = cipher.doFinal(input.getBytes());
//		} catch (Exception e) {
//			System.out.println(e.toString());
//		}
//		java.util.Base64.Encoder encoder = java.util.Base64.getEncoder();
//		
//		return new String(encoder.encodeToString(crypted));
//	}
//
//	public static String decrypt(String input, String key) {
//		byte[] output = null;
//		try {
//			java.util.Base64.Decoder decoder = java.util.Base64.getDecoder();
//			SecretKeySpec skey = new SecretKeySpec(key.getBytes(), "AES");
//			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
//			cipher.init(Cipher.DECRYPT_MODE, skey);
//			output = cipher.doFinal(decoder.decode(input));
//		} catch (Exception e) {
//			System.out.println(e.toString());
//		}
//		return new String(output);
//	}
//
//	/**
//	 * @param args
//	 */
//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//		
//		String key = "mvLBiZsiTbGwrfJB";
//		String data = "ABC";
//
//		System.out.println(EncryptionUtils.encrypt(data, key));
//		System.out.println(EncryptionUtils.decrypt(EncryptionUtils.encrypt(data, key), key));
//	}
//}

import java.net.URLEncoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Encoder;

public class EncryptionUtils {
     public static void main(String[] args) {
          try{
        	  
//            
//            Render URL SSO Kyuyo
//            IP server: 192.168.136.xx
//        	  
        	  
        	  String baseUrl = "192.168.136.xx/SSO?param=";
        	  
        	  String password = "KYUYOSSO2016";

          String param = new StringBuffer()
          				
          			.append("userid")
          			.append("\t")
          			.append("admin") 	// userid login
          			
          			.append("\t")
          			
          			.append("passwd")
          			.append("\t")
          			.append("1232")  // passwd login
          			.toString();
          
          String encrypted = encrypt(param,password);
          
          String url = baseUrl + URLEncoder.encode(encrypted, "UTF-8");
          System.out.println("Login SSO URL: " + url);
          
          
//          
//          API SSO Kyuyo
//          IP server: 192.168.136.xx
//          
          
//		Change password 
//          actionUrl: 192.168.136.xx/api/SSO/ChangePasswd
//          method: POST	
//          param: userid		-> userid login PE
//          	   oldpasswd	-> old passwd login PE
//          	   newpasswd	-> new passwd loginPE
         
          
//      Regist user using SSO
//          actionUrl: 192.168.136.xx/api/SSO/Register
//          method: POST
//          param1: userid		-> userid admin PE(ng co quyen dang ky)
//          	 	passwd		-> passwd admin PE(ng co quyen dang ky)   
          
//          param2: userid		-> userid login PE(ng duoc dang ky)
//          		passwd		-> passwd login PE(ng duoc dang ky)
          
       
//      System.out.println("URL: " + actionUrl);
//      System.out.println("data: param = " + encrypted);
          
          }catch (Exception e){
               e.printStackTrace();
          }
     }

     public static String encrypt(String text, String password) throws Exception{
               Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
               
               //setup key
               byte[] keyBytes= new byte[16];
                 byte[] b= password.getBytes("UTF-8");
                 int len= b.length; 
                 if (len > keyBytes.length) len = keyBytes.length;
                 System.arraycopy(b, 0, keyBytes, 0, len);
               
               SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
               
               //the below may make this less secure, hard code byte array the IV in both java and .net clients
               IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);
                
               cipher.init(Cipher.ENCRYPT_MODE,keySpec,ivSpec);
               byte [] results = cipher.doFinal(text.getBytes("UTF-8"));
               BASE64Encoder bseBase64 = new BASE64Encoder();
               //Encoder encoder = java.util.Base64.getEncoder();
               return bseBase64.encode(results);
              // return encoder.encodeToString(results);
     }
     
//     public static String decrypt(String text, String password) throws Exception{
//               Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
//               
//               //setup key
//               byte[] keyBytes= new byte[16];
//                 byte[] b= password.getBytes("UTF-8");
//                 int len= b.length; 
//                 if (len > keyBytes.length) len = keyBytes.length;
//                 System.arraycopy(b, 0, keyBytes, 0, len);
//               SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
//               IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);
//              cipher.init(Cipher.DECRYPT_MODE,keySpec,ivSpec);
//               
//               //Decoder decoder = Base64.getDecoder();
//              BASE64Encoder bseBase64 = new BASE64Encoder();
//               byte [] results = cipher.doFinal(decoder.decode(text));
//               return new String(results,"UTF-8");
//               
//
//     }

}
