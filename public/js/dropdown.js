// Dropdown functionality// listen for a click anywhere in the document
document.addEventListener('click', (e) => {
	// check to see if dropdown button was clicked
	const isDropdownButton = e.target.matches('[data-dropdown-button]');

	// if the dropdown was clicked, toggle the active class and display the dropdown (css will apply the styling to make the dropdown appear)
	if (isDropdownButton) {
		const currentDropdown = e.target.closest('[data-dropdown]');
		currentDropdown.classList.toggle('active');
	} else {
		// if the click existed within the dropdown, ignore the click
		if (e.target.closest('[data-dropdown]') != null) {
            const link = e.target.children[0]
            return link.click() || ''
        }

		// if the active class isnt applied to the dropdown yet, ignore, otherwise remove the active class
		const dropdown = document.querySelector('[data-dropdown].active');

		if (dropdown !== null)
			dropdown.classList.remove('active');
	}
});