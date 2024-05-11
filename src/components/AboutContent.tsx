import { Stack } from "@telefonica/mistica";

export default function AboutPage() {
    return (
        <div style={{fontSize: '20px', textAlign: 'justify', color: 'black'}}>
            AutomTest is a Test-Driven Development (TDD) test case generator designed for Java,
             specifically tailored to generate unit tests prior to developing the necessary system methods.
            <br />
            <br />
            To accomplish this objective, AutomTest requires information about the methods that the system must include, 
            including the data types for each parameter and the expected return values. Armed with that information and by constructing 
            Equivalence Classes, AutomTest can generate the required tests.
            <br />
            <br />

            Obtaining the necessary method inputs can be achieved through two avenues: either manually inserting the method 
            information or utilizing a User Story that outlines the requirements under test.
            <br />
            <br />

            To get started, use the options available in the left menu. Start by choosing between:
            <br />
            <br />

            1. Inserting a User Story
            <br />
            2. Inserting Method Information manually
        </div>
    )
}