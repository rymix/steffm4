# `TEMPLATES > security.md` - Responsible Security Disclosure README standard

## Our security policy and Your responsibility
- **POLICY**:

*Our security policy is to avoid leaving the ecosystem worse than we found it. Meaning we are not planning to introduce vulnerabilities into the ecosystem.*

The Stef.fm team and community take all security bugs in Stef.fm seriously. Thank you for improving the security of Stef.fm. We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.

Report security bugs by emailing the lead maintainer at [EMAIL ADDRESS] and include the word "SECURITY" in the subject line..

The lead maintainer will acknowledge your email within a week, and will send a more detailed response 48 hours after that indicating the next steps in handling your report. After the initial reply to your report, the security team will endeavor to keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

- Stef.fm will confirm the problem and determine the affected versions.
- Stef.fm will audit code to find any potential similar problems.
- Stef.fm will prepare fixes for all releases still under maintenance. These fixes will be released as fast as possible.

Report security bugs in third-party modules to the person or team maintaining the module.

- **SECURITY DISCLOSURE**:

*Your responsibility is to report vulnerabilities to us using the guidelines outlined below.*

Discuss how someone should disclose a vulnerability to Stef.fm, in tl;dr ( or ELI5 ) language. Then expand on this with "How To Disclose a vulnerability in detail". Please give detailed steps on how to disclose the vulnerability. Keep these OWASP guidelines in mind ( https://www.owasp.org/index.php/Vulnerability_Disclosure_Cheat_Sheet ) when creating your disclosure policy. Below are some recommendations for security disclosures:
- Stef.fm security contact { contact: mailto:[EMAIL ADDRESS] }
- Disclosure format: When disclosing vulnerabilities please 
  1. Your name and affiliation (if any).
  2. include scope of vulnerability. Let us know who could use this exploit.
  3. document steps to identify the vulnerability. It is important that we can reproduce your findings. 
  4. how to exploit vulnerability, give us an attack scenario.

## Stef.fm Checklist: Security Recommendations
Follow these steps to improve security when using Stef.fm.
1. ...SEE SOMETHING
2. ...SAY SOMETHING

### 1)...SEE SOMETHING
We suggest you goto #2 if this happens.

**Why?**
Through experience we have found it is best to goto #2 in this situation.

**How?**
Read our suggestions on [Reporting Security Issues](https://github.com/.../security.md#Reporting Security Issues).
`SHOW HOW TO CODE EXAMPLES IF POSSIBLE`
or goto #2

## Version
**version 0.0.1**

Use Semantic Versioning to help other see at a glance if this document has been updated and what was the scope of the udpate.

- Major version incremented when contact information changes in the `security.md` file or in the `security.txt` file that refers to this file. Or a required field in the `security.txt` has changed in a non backwards compatible manner.
- Minor update is a backward compatible change has been made to the aforementioned files.
- Patch update is when a minor typo is fixed but no significant change has been made.
