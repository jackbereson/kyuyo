/*
 * $Id: SingleSignOnBean.java 2227 2008-09-25 03:24:26Z m.arai $
 * All rights reserved, Copyright (c) MITANI SANGYO Co.,Ltd. 2005-
 */

package com.mitani.l2.usersession.poweregg;

import net.poweregg.engine.common.IClassification;
import net.poweregg.engine.organization.IOrganization;
import net.poweregg.system.PEApplBeanBase;
import net.poweregg.system.PEFatalException;
import net.poweregg.util.Encryption;
import net.poweregg.util.URLEncoder;
import net.poweregg.web.engine.common.ClassificationInfo;
import net.poweregg.web.engine.navigation.LoginUser;
import net.poweregg.web.engine.organization.container.PasswordInfo;

import com.mitani.l2.common.pe.ejb.ICorpConfig;
import com.mitani.l2.util.EncryptionUtils;

/**
 * single sign on bean class<br>
 * 
 * @author Giangnh <br>
 */
public class SingleSignOnBean extends PEApplBeanBase {

	/**
	 * constant SECRET_KEY_CLASS_NO<br>
	 */
	private static final String SECRET_KEY_CLASS_NO = "0001";

	/**
	 * constant SECRET_KEY_COMMON_NO<br>
	 */
	private static final String SECRET_KEY_COMMON_NO = "9210";

	/**
	 * constant DEFAULT_COPR_ID<br>
	 * 会社 ID も L2 識別番号も指定しない場合に使用される会社 ID。<br>
	 * 全会社共通を表す会社 ID のことではないので注意。
	 */
	private static final String DEFAULT_COPR_ID = "0001";

	/**
	 * Constructor SingleSignOnBean<br>
	 * 
	 * @exception PEFatalException
	 */
	public SingleSignOnBean() throws PEFatalException {
		super();
	}

	/**
	 * get redirect url<br>
	 * 
	 * @param corpId
	 * @param l2No
	 * @param loginUser
	 * @param actionPath
	 * @param showMenu
	 * @param ignoreSso
	 * @param resizable
	 * @return String
	 * @exception PEFatalException
	 */
	public String getRedirectUrl(String corpId, String l2No,
			LoginUser loginUser, String actionPath, String showMenu,
			String ignoreSso, String resizable) throws PEFatalException {

		StringBuffer url = null;
		try {
			startTransaction();

			String key = new StringBuffer()//

					.append("userid=")//
					.append(loginUser.getUserID())//

					.append("\t")//
					.append("passwd=")//
					.append(Encryption.decrypt(getPassword(loginUser)))//

					.append("\t")//
					.append("path=")//
					.append(actionPath)//

					.toString();

			String corpIdWk = corpId;
			if (corpIdWk == null || corpIdWk.equals("")) {
				corpIdWk = DEFAULT_COPR_ID;
			}
			String encryptKey = EncryptionUtils.encryptBySecretKey(key//
					, getClass(corpIdWk, SECRET_KEY_COMMON_NO,
							SECRET_KEY_CLASS_NO));

			String resizableParam = "";
			if (resizable != null && (resizable.compareToIgnoreCase("yes") == 0 //
					|| resizable.compareToIgnoreCase("true") == 0)) {
				resizableParam = "&resizable=true";
			}

			String baseUrl = null;
			ICorpConfig cfg = (ICorpConfig) getComponent(ICorpConfig.class);
			if (corpId != null && !corpId.equals("")) {
				baseUrl = cfg.getSingleSignOnUrl(corpId);
			} else if (l2No != null && !l2No.equals("")) {
				baseUrl = cfg.getSingleSignOnUrlByL2No(l2No);
			} else {
				baseUrl = cfg.getSingleSignOnUrl(DEFAULT_COPR_ID);
			}

			url = new StringBuffer()//
					.append(baseUrl)//
					.append("?key=")//
					// 注意 MUST encode
					.append(URLEncoder.encode(encryptKey))//

					.append("&showMenu=" + showMenu)//
					.append("&ignoreSso=" + ignoreSso)//
					.append(resizableParam)//
			;

			commitTransaction();

		} catch (Exception e) {
			rollbackTransaction();
			PEFatalException.fatalException(e, "cannot get redirect url");
		}

		return url != null ? url.toString() : null;
	}

	/**
	 * get password<br>
	 * 
	 * @param loginUser
	 * @return String
	 * @exception Exception
	 */
	public String getPassword(LoginUser loginUser) throws Exception {
		IOrganization org = (IOrganization) getComponent(IOrganization.class);
		PasswordInfo loginPassword = org.getLoginPassword(loginUser.getEmpID());
		return loginPassword.getPassword();
	}

	private String getClass(String corpId, String commonNo, String classNo)
			throws Exception {
		IClassification cls = (IClassification) getComponent(IClassification.class);
		ClassificationInfo info = cls.getClassification(corpId, commonNo,
				classNo);

		if (info == null) {
			PEFatalException
					.fatalException("master data not exist: corpId=" + corpId
							+ ",commonNo=" + commonNo + ", classNo=" + classNo);
		}

		return info.getCharData1();
	}

	public String getSalaryUrl(LoginUser loginUser)throws PEFatalException {
		StringBuffer url = null;
		try {
			startTransaction();
			String keyEnc = "KYUYOSSO2016";
			String param = new StringBuffer()//

					.append("userid")//
					.append("\t")//
					.append(loginUser.getUserID())//
					.append("\t")//
					.append("passwd")//
					.append("\t")//
					.append(Encryption.decrypt(getPassword(loginUser)))//
					.toString();
			String encryptKey = com.mitani.l2.usersession.poweregg.EncryptionUtils.encrypt(param, keyEnc);
			String baseUrl = "http://192.168.136.124:4000/SSO";
			url = new StringBuffer()//
					.append(baseUrl)//
					.append("?param=")//
					// 注意 MUST encode
					.append(URLEncoder.encode(encryptKey))//
			;

			commitTransaction();

		} catch (Exception e) {
			rollbackTransaction();
			PEFatalException.fatalException(e, "cannot get redirect url");
		}

		return url != null ? url.toString() : null;
	}
}
