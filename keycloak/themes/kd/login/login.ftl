<#import "template.ftl" as layout>
  <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
         tailwind.config = {
      theme: {
      extend: {
          colors: {
          clifford: '#da373d',
          }
      },
      fontFamily: {
          outfit: ["Outfit", "sans-serif"],
          "be-vietnam": ["Be Vietnam Pro", "sans-serif"],
      },
      }
  }

        const toggleInputPassword = () => {
            const passwordId = document.getElementById("password");
            const svgs = document.getElementsByClassName("pwd-icon");
            if (passwordId.type === "password"){
                passwordId.type = "text";

                svgs[0].classList.add("hidden");
                svgs[1].classList.remove("hidden");
                svgs[1].classList.add("block");
            }
            else {
                passwordId.type = "password";
                svgs[0].classList.remove("hidden");
                svgs[1].classList.remove("block");
                svgs[1].classList.add("hidden");
            }
        };
        </script>
    </head>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    	<#if section = "header">
    <#elseif section = "form">
    <div id="kc-form">
      <div id="kc-form-wrapper" class="min-h-screen box-border w-full flex flex-col items-center py-10 lg:py-16 space-y-10">
          	<a data-test="backToHomePage" href="${client.baseUrl}">Keycloak.demo</a>
        <#if realm.password>
            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post" class="w-[90%] max-w-[650px] bg-white m-auto rounded shadow shadow-gray-200 py-8 px-5 lg:p-8 flex flex-col items-start gap-y-3">

           	<span class="text-sm sm:text-base md:text-lg xl:text-xl font-bold">${msg("doNewLogin")}</span>

         <#if messagesPerField.existsError('username','password')>
		    <div class="flex items-center text-xs md:text-sm xl:text-base">
				<img src="${url.resourcesPath}/img/Warning.svg" alt="warning"
					class="w-[calc(13px_+_0.4vw)] h-[calc(13px_+_0.4vw)]">
				<span id="input-error" aria-live="polite"
           			class="${properties.kcInputErrorMessageClass!} text-red-500">
           			${kcSanitize(msg("doLoginFail"))?no_esc}
				</span>
			</div>
         </#if>

                <div class="w-full flex flex-col gap-y-2 lg:gap-y-3">
                    <label for="username">${msg("email")}<span class="text-red-600">*</span></label>
                 	<div class="relative w-full">
                        <#if usernameEditDisabled??>
                    	    <input tabindex="1" id="username" class="${properties.kcInputClass!}"
                    	    name="username" value="${(login.username!'')}" type="text" disabled />
                        <#else>
                            <input
                                class="text-xs lg:text-sm placeholder:text-xs lg:placeholder:text-base h-full w-full pl-8 border border-blue-100 rounded py-2.5 lg:py-4 outline-none focus:ring-2 focus:ring-blue-400 focus:border-2 <#if messagesPerField.existsError('username','password')>border-[3px] border-red-600<#else>border-[3px] border-gray-100</#if>"
                                tabindex="1" id="username" name="username" value="${(login.username!'')}" type="text"
                                autocomplete="off"
                                placeholder="${msg('email')}"
                                aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                            />
                        </#if>
                        <img src="${url.resourcesPath}/img/User.svg" alt="user-icon" class="icon cursor-pointer absolute h-5 w-5 inset-2.5 lg:inset-y-4">
                    </div>
                </div>

                <div class="w-full flex flex-col gap-y-2 lg:gap-y-3">
                    <label for="password">${msg("password")}<span class="text-red-600">*</span></label>
					<div class="w-full relative">
                        <img
						    src="${url.resourcesPath}/img/padlock.svg"
						    alt="lock-icon"
						    class="absolute inset-y-2.5 lg:inset-y-4 left-2 h-5 w-5">
                        <input tabindex="2" id="password" name="password" type="password" autocomplete="off"
                            placeholder="${msg('password')}"
                            aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                            class="text-xs lg:text-sm placeholder:text-xs lg:placeholder:text-base h-full w-full pl-8 border border-blue-100 outline-none focus:ring-2 rounded py-2.5 lg:py-4 focus:ring-blue-400 focus:border-2 <#if messagesPerField.existsError('username','password')>border-[3px] border-red-600<#else>border-[3px] border-gray-100</#if>"
                        />
                        <img src="${url.resourcesPath}/img/close-eye.svg" alt="hide-eye-icon" class="pwd-icon cursor-pointer absolute inset-y-2.5 lg:inset-y-4 h-5 w-5 right-2" onclick="toggleInputPassword()">
                        <img src="${url.resourcesPath}/img/open-eye.svg" alt="see-eye-icon" class="pwd-icon cursor-pointer absolute inset-y-2.5 lg:inset-y-4 h-5 w-5 right-2 hidden" onclick="toggleInputPassword()">
                    </div>
                </div>
                <div class="w-full flex justify-between items-center my-1.5 text-xs md:text-sm xl:text-base">
                    <div id="kc-form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div>
                                <label>
                                    <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                    <#else>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                    </#if>
                                </label>
                            </div>
                        </#if>
                        </div>
                        <div class="${properties.kcFormOptionsWrapperClass!}">
                            <a href="${client.baseUrl}/auth/forgot-password" class="text-blue-500 underline underline-offset-4" tabindex="5">${msg("doForgotPassword")}</a>
                        </div>
                  </div>
                  <div class="mt-4 space-y-4 md:space-y-7 lg:space-y-10 w-full">
                    <div id="kc-form-buttons" class="relative rounded w-full h-10 md:h-11 lg:h-14">
                      <input
                        type="hidden"
                        id="id-hidden-input"
                        name="credentialId"
                        <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>
                      />
                      <input tabindex="4" class="font-bold rounded absolute w-full inset-0 bg-[#203E79] text-white"
                        name="login"
                        id="kc-login"
                        type="submit"
                        value="${msg('doLogIn')}"
                      />
                    </div>
                    <div class="text-center text-gray-900 text-xs md:text-sm lg:text-base">
                      <span>${msg("doNoAccount")}</span>
                      <a href="${client.baseUrl}/sign-up" class="text-blue-500 underline underline-offset-4">${msg("doSignup")}</a>
                    </div>
                  </div>
            </form>
        </#if>
        </div>

        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <hr/>
                <h4>${msg("identity-provider-login-label")}</h4>

                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
                        <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                type="button" href="${p.loginUrl}">
                            <#if p.iconClasses?has_content>
                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                            <#else>
                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                            </#if>
                        </a>
                    </#list>
                </ul>
            </div>
        </#if>

    </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6"
                                                 href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>
