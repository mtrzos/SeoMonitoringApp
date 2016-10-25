package com.ananas.smarteo.web.rest;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ananas.smarteo.security.AuthoritiesConstants;
import com.stripe.Stripe;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.model.Charge;

@RestController
@RequestMapping("/api")
public class PaymentResource {

	@RequestMapping(value = "/payments",
			method = RequestMethod.GET,
	        produces = MediaType.APPLICATION_JSON_VALUE)
	@Secured(AuthoritiesConstants.ADMIN)
	    public String getActiveProfiles1() {
	        return "WORKS";
	    }
	
	@RequestMapping(value = "/payments",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ModelAndView getActiveProfiles(@RequestParam String stripeEmail, @RequestParam String stripeToken, 
			@RequestParam String stripeTokenType, HttpServletRequest request) {
		
		Stripe.apiKey = "sk_test_exzDr8k9tj4F8dcd4TIeuLru";
		
		try {
			  Map<String, Object> chargeParams = new HashMap<String, Object>();
			  chargeParams.put("amount", 1000); // Amount in cents
			  chargeParams.put("currency", "gbp");
			  chargeParams.put("source", stripeToken);
			  chargeParams.put("description", "Example charge");

			  Charge charge = Charge.create(chargeParams);
			  System.out.println(request.getRequestURI());
			  System.out.println(request.getRequestURI());
			  System.out.println(request.getRequestURI());
			  System.out.println(request.getContextPath());
			} catch (CardException | AuthenticationException | InvalidRequestException | APIConnectionException | APIException e) {
				return new ModelAndView("redirect:/#/payment?successful=false");
			}

			
		return new ModelAndView("redirect:/#/payment?successful=true");
	        
	    }
}
