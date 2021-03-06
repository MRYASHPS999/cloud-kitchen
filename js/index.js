var customer = {}, isLoggedIn = false;

// added a jquery plugin to every file, check in the head tag

// when the page loads, it will send a refresh request to the server
// the server verifies the cookie and logs in the user
$(document).ready(async () => {
	$('.loggedIn').hide();
	$('.admin-link').hide();
	const response = await fetch('http://localhost:5000/refresh', {
		method: 'POST',
		credentials: 'include'
	})
	const data = await response.json();
	if(data.success) {
		// all the changes in UI go here when user logs in
		customer = data.body.customer; // has all the customer data
		isLoggedIn = true; // will come handy in future
		if(customer.isAdmin) {
			$('.admin-link').show();
		}
		$('.notLoggedIn').hide();
		$('.loggedIn').show();
		$('#username').text(customer.name);
		$('#cartname').val(customer.name);
		$('#cartadd').val(customer.address);
		
	}
})

const register = async () => {
	// snatching the input with jquery's val function
	const name = $("#name").val(),
		address = $("#address").val(),
		email = $("#email").val(),
		mobileNumber = $("#mobileNumber").val(),
		password = $("#password").val(),
		confirmPassword = $('#confirmPassword').val();
	console.log(confirmPassword);
	if(name && address && email && mobileNumber && password && confirmPassword) {
		// sending a request only if all the fields are present
		const response = await fetch('http://localhost:5000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name, address, email, mobileNumber, password, confirmPassword}),
			credentials: 'include'
		});
		const data = await response.json();
		if(!data.success) // if request is unsuccessful show the error message as alert
			return alert(data.message); // we can do something better here but we are in a rush :(
		window.location.replace('/');
	}
	else 
		alert('Fill all the fields');
};

// similar to register
const login = async () => {
	const email = $('#email').val(), password = $('#password').val();
	if(email && password) {
		const response = await fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email, password}),
			credentials: 'include'
		})
		const data = await response.json();
		if(!data.success) 
			return alert(data.message);
		window.location.replace('/');
		
	}
	else 
		alert('Fill all the fields');
}

// deletes the cookie and logs user out
const logout = async () => {
	const response = await fetch('http://localhost:5000/logout', {
		method: 'DELETE',
		credentials: 'include'
	})
	customer = null;
	isLoggedIn = false;
	window.location.replace('/');
}