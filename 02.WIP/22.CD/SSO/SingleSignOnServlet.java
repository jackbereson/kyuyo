/*
 * $Id: SingleSignOnServlet.java 2227 2008-09-25 03:24:26Z m.arai $
 * All rights reserved, Copyright (c) MITANI SANGYO Co.,Ltd. 2005-
 */

package com.mitani.l2.usersession.poweregg;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.poweregg.system.PEServletBase;
import net.poweregg.util.Encryption;
import net.poweregg.util.URLEncoder;
import net.poweregg.web.engine.navigation.LoginUser;

/**
 * @author giangnh
 * 
 */
public class SingleSignOnServlet extends PEServletBase {

//	/**
//	 * do action<br>
//	 * 
//	 * @param request
//	 * @param response
//	 */
//	protected void doAction(HttpServletRequest request,
//			HttpServletResponse response) {
//		try {
//			LoginUser loginUser = (LoginUser) request.getSession(false)
//					.getAttribute("loginUser");
//			String actionPath = request.getParameter("actionPath");
//			String showMenu = request.getParameter("showMenu");
//			String ignoreSso = request.getParameter("ignoreSso");
//			String resizable = request.getParameter("resizable");
//			String corpId = request.getParameter("corpId");
//			String l2No = request.getParameter("l2No");
//
//			String redirectUrl = new SingleSignOnBean()
//					.getRedirectUrl(corpId, l2No, loginUser, actionPath,
//							showMenu, ignoreSso, resizable);
//
//			String newProcess = request.getParameter("newProcess");
//			if ("true".equals(newProcess)) {
//				request.setAttribute("REDIRECT_URL", redirectUrl);
//				_Forward(request, response, "/UBR/UBRexecL2.jsp");
//			} else {
//				response.sendRedirect(redirectUrl);
//			}
//
//		} catch (net.poweregg.system.PEFatalException e) {
//			_peError(request, response, e);
//		} catch (Exception e) {
//			_peError(request, response, e);
//		}
//
//	}
	/**
	 * do action Login<br>
	 * 
	 * @param request
	 * @param response
	 */
//	protected void doAction(HttpServletRequest request,
//			HttpServletResponse response) {
//		try {
//			LoginUser loginUser = (LoginUser) request.getSession(false)
//					.getAttribute("loginUser");
//			//String actionPath = request.getParameter("actionPath");
//			String redirectUrl = new SingleSignOnBean()
//					.getSalaryUrl(loginUser);
//
//			//String newProcess = request.getParameter("newProcess");
////			if ("true".equals(newProcess)) {
////				request.setAttribute("REDIRECT_URL", redirectUrl);
////				_Forward(request, response, "/UBR/UBRexecL2.jsp");
////			} else {
//				response.sendRedirect(redirectUrl);
//		//	}
//
//		} catch (net.poweregg.system.PEFatalException e) {
//			_peError(request, response, e);
//		} catch (Exception e) {
//			_peError(request, response, e);
//		}
//
//	}
//	
	/**
	 * do action Change PassWord<br>
	 * 
	 * @param request
	 * @param response
	 */
//	protected void doAction(HttpServletRequest request,
//			HttpServletResponse response) {
//		try {
//			LoginUser loginUser = (LoginUser) request.getSession(false)
//					.getAttribute("loginUser");
//			String baseUrl = "http://192.168.136.124:4000/api/SSO/ChangePasswd";
//			URL url = new URL(baseUrl);
//			
//			HttpURLConnection  conn = (HttpURLConnection)url.openConnection();
//	        conn.setRequestMethod("POST");
//	        String keyEnc = "KYUYOSSO2016";
//			String endpParams = new StringBuffer()//
//
//					.append("userid")//
//					.append("\t")//
//					.append(loginUser.getUserID())//
//					.append("\t")//
//					.append("oldpasswd")//
//					.append("\t")//
//					.append(Encryption.decrypt(new SingleSignOnBean().getPassword(loginUser)))
//					.append("\t")//
//					.append("newpasswd")//
//					.append("\t")//
//					.append("new123")//
//					.toString();
//
//			String encryptKey = com.mitani.l2.usersession.poweregg.EncryptionUtils.encrypt(endpParams, keyEnc);
//			String param ="param="+URLEncoder.encode(encryptKey);
//			conn.setDoOutput(true);
//	        conn.setDoInput(true);
//			DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
//			wr.writeBytes(param);
//			wr.flush();
//			wr.close();
//
//			int responseCode = conn.getResponseCode();
//			System.out.println("\nSending 'POST' request to URL : " + url);
//			System.out.println("Post parameters : " + param);
//			System.out.println("Response Code : " + responseCode);
//
//			BufferedReader in = new BufferedReader(
//			        new InputStreamReader(conn.getInputStream()));
//			String inputLine;
//			StringBuffer bufresponse = new StringBuffer();
//
//			while ((inputLine = in.readLine()) != null) {
//				bufresponse.append(inputLine);
//			}
//			in.close();
//
//			//print result
//			System.out.println(bufresponse.toString());
//
//		} catch (net.poweregg.system.PEFatalException e) {
//			_peError(request, response, e);
//		} catch (Exception e) {
//			_peError(request, response, e);
//		}
//	}
	/**
	 * do action Change PassWord<br>
	 * 
	 * @param request
	 * @param response
	 */
	protected void doAction(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			LoginUser loginUser = (LoginUser) request.getSession(false)
					.getAttribute("loginUser");
			String baseUrl = "http://192.168.136.124:4000/api/SSO/Register";
			URL url = new URL(baseUrl);
			
			HttpURLConnection  conn = (HttpURLConnection)url.openConnection();
	        conn.setRequestMethod("POST");
	        String keyEnc = "KYUYOSSO2016";
	        //User Login - setup
			String endpParam1 = new StringBuffer()//
					.append("userid")//
					.append("\t")//
					.append(loginUser.getUserID())//
					.append("\t")//
					.append("passwd")//
					.append("\t")//
					.append(Encryption.decrypt(new SingleSignOnBean().getPassword(loginUser)))
					.toString();
			//User can dang ki
			String endpParam2 = new StringBuffer()//

			.append("userid")//
			.append("\t")//
			.append("test")//
			.append("\t")//
			.append("passwd")//
			.append("\t")//
			.append("456")
			.toString();
			
			String encryptKey1 = com.mitani.l2.usersession.poweregg.EncryptionUtils.encrypt(endpParam1, keyEnc);
			String encryptKey2 = com.mitani.l2.usersession.poweregg.EncryptionUtils.encrypt(endpParam2, keyEnc);
			String param ="param1="+URLEncoder.encode(encryptKey1)+"&param2="+URLEncoder.encode(encryptKey2);
			conn.setDoOutput(true);
	        conn.setDoInput(true);
			DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
			wr.writeBytes(param);
			wr.flush();
			wr.close();

			int responseCode = conn.getResponseCode();
			System.out.println("\nSending 'POST' request to URL : " + url);
			System.out.println("Post parameters : " + param);
			System.out.println("Response Code : " + responseCode);

			BufferedReader in = new BufferedReader(
			        new InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuffer bufresponse = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				bufresponse.append(inputLine);
			}
			in.close();

			//print result
			System.out.println(bufresponse.toString());

		} catch (net.poweregg.system.PEFatalException e) {
			_peError(request, response, e);
		} catch (Exception e) {
			_peError(request, response, e);
		}
	}
}
