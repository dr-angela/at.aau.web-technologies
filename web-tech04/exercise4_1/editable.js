document.addEventListener("DOMContentLoaded", () => {
    // Get all sections with h1 headings
    const sections = document.querySelectorAll("section");
    const sectionTitles = Array.from(sections).map(section => section.querySelector("h1").innerText);

    // Create form elements
    const form = document.createElement("form");
    const select = document.createElement("select");
    const input = document.createElement("input");
    const textarea = document.createElement("textarea");
    const submitButton = document.createElement("button");

    // Configure form elements
    input.type = "text";
    submitButton.type = "button"; // Set button type to avoid form submission
    submitButton.innerText = "Update Section";
    submitButton.disabled = true; // Initially disabled

    // Populate select box with section titles
    sectionTitles.forEach((title, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.innerText = title;
        select.appendChild(option);
    });

    // Append elements to the form
    form.appendChild(select);
    form.appendChild(input);
    form.appendChild(textarea);
    form.appendChild(submitButton);

    // Insert the form after the last section
    sections[sections.length - 1].after(form);

    // Event listener for section selection
    select.addEventListener("change", () => {
        const selectedSection = sections[select.value];
        const heading = selectedSection.querySelector("h1");
        input.value = heading ? heading.innerText : ""; // Set input to section heading
        textarea.value = selectedSection.innerHTML; // Set textarea to section content
        submitButton.disabled = false; // Enable button
    });

    // Event listener for the submit button
    submitButton.addEventListener("click", () => {
        const selectedSection = sections[select.value];
        const heading = selectedSection.querySelector("h1");

        // Update section heading if heading exists
        if (heading) {
            heading.innerText = input.value;
        }

        // Update section content
        selectedSection.innerHTML = textarea.value;

        // Ensure the heading is updated after modifying innerHTML
        if (!selectedSection.querySelector("h1") && input.value) {
            const newHeading = document.createElement("h1");
            newHeading.innerText = input.value;
            selectedSection.prepend(newHeading);
        }

        // Refresh select options
        select.options[select.selectedIndex].innerText = input.value;
        submitButton.disabled = true; // Disable button after update
    });
});