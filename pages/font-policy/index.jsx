import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import tw, { css } from "twin.macro";

const SubLink = tw.a`font-sans font-bold mb-4 block letter-spacing[.5px] text-sm line-height[24px] text-blue-dark cursor-pointer`;
const Paragraph = tw.p`font-sans block text-base mb-4 text-blue-dark`;
const SubHeading = tw.h2`letter-spacing[.5px] text-2xl text-blue-dark font-sans font-semibold mb-4`;

const ListItem = ({ children }) => (
  <li
    tw="text-base text-blue-dark ml-3"
    css={`
      display: grid;
      grid-gap: 0.8em;
      grid-template-columns: 0 0.85fr;

      &:not(:last-of-type) {
        margin-bottom: 2px;
      }

      &:before {
        content: "";
        width: 5px;
        height: 5px;
        margin-top: 8px;
        border-radius: 50%;
        background-color: #384a62;
      }
    `}
  >
    {children}
  </li>
);

const FontPolicy = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            <div>
              <h1 className="font-dm text-blue-dark font-32 mb-14">
                Font Policy
              </h1>

              <div tw="flex md:min-height[2000px]">
                <div tw="border-right[1px solid rgba(56, 74, 98, 0.1)] max-width[290px] w-full hidden md:block">
                  <div tw="pr-3 sticky top[80px] max-height[80vh] overflow-auto">
                    <SubLink href="#apache" tw="mb-5">
                      Apache License
                    </SubLink>

                    <SubLink href="#sil" tw="mb-5">
                      SIL Open Font License
                    </SubLink>

                    <SubLink href="#ubuntu" tw="mb-5">
                      Ubuntu Font Lincese.
                    </SubLink>
                  </div>
                </div>

                <div tw="w-full md:px-8 max-width[870px]">
                  <Paragraph tw="text-red-light!">Font Licenses</Paragraph>
                  <Paragraph>
                    Below are the various lincenses under which our public fonts
                    are used:
                  </Paragraph>

                  <Paragraph tw="font-semibold mb-1!">Apache License</Paragraph>

                  <Paragraph tw="font-semibold mb-1!">
                    SIL Open Font License
                  </Paragraph>

                  <Paragraph tw="font-semibold mb-10!">
                    Ubuntu Font Lincese.
                  </Paragraph>

                  <section id="apache" tw="mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      1. Apache License
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      ID: Apache License <br />
                      Version 2.0, January 2004 <br />
                      http://www.apache.org/licenses/
                    </Paragraph>
                    <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                      TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND
                      DISTRIBUTION
                    </Paragraph>
                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Definitions.
                        </Paragraph>
                        <Paragraph
                          tw="whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: `"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
                            "Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
                            "Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
                            "You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.
                            "Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
                            "Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
                            "Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
                            "Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
                            "Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise. designated in writing by the copyright owner as "Not a Contribution."
                            "Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.`,
                          }}
                        />
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Grant of Copyright License.
                        </Paragraph>
                        <Paragraph>
                          Subject to the terms and conditions of this License,
                          each Contributor hereby grants to You a perpetual,
                          worldwide, non-exclusive, no-charge, royalty-free,
                          irrevocable copyright license to reproduce, prepare
                          Derivative Works of, publicly display, publicly
                          perform, sublicense, and distribute the Work and such
                          Derivative Works in Source or Object form.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Grant of Patent License.
                        </Paragraph>
                        <Paragraph>
                          Subject to the terms and conditions of this License,
                          each Contributor hereby grants to You a perpetual,
                          worldwide, non-exclusive, no-charge, royalty-free,
                          irrevocable (except as stated in this section) patent
                          license to make, have made, use, offer to sell, sell,
                          import, and otherwise transfer the Work, where such
                          license applies only to those patent claims licensable
                          by such Contributor that are necessarily infringed by
                          their Contribution(s) alone or by combination of their
                          Contribution(s) with the Work to which such
                          Contribution(s) was submitted. If You institute patent
                          litigation against any entity (including a cross-claim
                          or counterclaim in a lawsuit) alleging that the Work
                          or a Contribution incorporated within the Work
                          constitutes direct or contributory patent
                          infringement, then any patent licenses granted to You
                          under this License for that Work shall terminate as of
                          the date such litigation is filed.
                        </Paragraph>
                      </div>
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Redistribution
                        </Paragraph>
                        <Paragraph>
                          You may reproduce and distribute copies of the Work or
                          Derivative Works thereof in any medium, with or
                          without modifications, and in Source or Object form,
                          provided that You meet the following conditions: You
                          must give any other recipients of the Work or
                          Derivative Works a copy of this License; and You must
                          cause any modified files to carry prominent notices
                          stating that You changed the files; and You must
                          retain, in the Source form of any Derivative Works
                          that You distribute, all copyright, patent, trademark,
                          and attribution notices from the Source form of the
                          Work, excluding those notices that do not pertain to
                          any part of the Derivative Works; and If the Work
                          includes a "NOTICE" text file as part of its
                          distribution, then any Derivative Works that You
                          distribute must include a readable copy of the
                          attribution notices contained within such NOTICE file,
                          excluding those notices that do not pertain to any
                          part of the Derivative Works, in at least one of the
                          following places: within a NOTICE text file
                          distributed as part of the Derivative Works; within
                          the Source form or documentation, if provided along
                          with the Derivative Works; or, within a display
                          generated by the Derivative Works, if and wherever
                          such third-party notices normally appear. The contents
                          of the NOTICE file are for informational purposes only
                          and do not modify the License. You may add Your own
                          attribution notices within Derivative Works that You
                          distribute, alongside or as an addendum to the NOTICE
                          text from the Work, provided that such additional
                          attribution notices cannot be construed as modifying
                          the License. You may add Your own copyright statement
                          to Your modifications and may provide additional or
                          different license terms and conditions for use,
                          reproduction, or distribution of Your modifications,
                          or for any such Derivative Works as a whole, provided
                          Your use, reproduction, and distribution of the Work
                          otherwise complies with the conditions stated in this
                          License.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Submission of Contributions.
                        </Paragraph>
                        <Paragraph>
                          Unless You explicitly state otherwise, any
                          Contribution intentionally submitted for inclusion in
                          the Work by You to the Licensor shall be under the
                          terms and conditions of this License, without any
                          additional terms or conditions. Notwithstanding the
                          above, nothing herein shall supersede or modify the
                          terms of any separate license agreement you may have
                          executed with Licensor regarding such Contributions.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Trademarks.
                        </Paragraph>
                        <Paragraph>
                          This License does not grant permission to use the
                          trade names, trademarks, service marks, or product
                          names of the Licensor, except as required for
                          reasonable and customary use in describing the origin
                          of the Work and reproducing the content of the NOTICE
                          file.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Disclaimer of Warranty.
                        </Paragraph>
                        <Paragraph>
                          Unless required by applicable law or agreed to in
                          writing, Licensor provides the Work (and each
                          Contributor provides its Contributions) on an "AS IS"
                          BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
                          either express or implied, including, without
                          limitation, any warranties or conditions of TITLE,
                          NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
                          PARTICULAR PURPOSE. You are solely responsible for
                          determining the appropriateness of using or
                          redistributing the Work and assume any risks
                          associated with Your exercise of permissions under
                          this License.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Limitation of Liability.
                        </Paragraph>
                        <Paragraph>
                          In no event and under no legal theory, whether in tort
                          (including negligence), contract, or otherwise, unless
                          required by applicable law (such as deliberate and
                          grossly negligent acts) or agreed to in writing, shall
                          any Contributor be liable to You for damages,
                          including any direct, indirect, special, incidental,
                          or consequential damages of any character arising as a
                          result of this License or out of the use or inability
                          to use the Work (including but not limited to damages
                          for loss of goodwill, work stoppage, computer failure
                          or malfunction, or any and all other commercial
                          damages or losses), even if such Contributor has been
                          advised of the possibility of such damages.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Accepting Warranty or Additional Liability.
                        </Paragraph>
                        <Paragraph>
                          While redistributing the Work or Derivative Works
                          thereof, You may choose to offer, and charge a fee
                          for, acceptance of support, warranty, indemnity, or
                          other liability obligations and/or rights consistent
                          with this License. However, in accepting such
                          obligations, You may act only on Your own behalf and
                          on Your sole responsibility, not on behalf of any
                          other Contributor, and only if You agree to indemnify,
                          defend, and hold each Contributor harmless for any
                          liability incurred by, or claims asserted against,
                          such Contributor by reason of your accepting any such
                          warranty or additional liability.
                        </Paragraph>
                      </div>
                      <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                        END OF TERMS AND CONDITIONS
                      </Paragraph>
                    </div>

                    <div tw="md:pl-24 pl-8 mt-6">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          APPENDIX
                        </Paragraph>
                        <Paragraph>
                          How to apply the Apache License to your work
                        </Paragraph>
                        <Paragraph>
                          To apply the Apache License to your work, attach the
                          following boilerplate notice, with the fields enclosed
                          by brackets "[]" replaced with your own identifying
                          information. (Don't include the brackets!) The text
                          should be enclosed in the appropriate comment syntax
                          for the file format. We also recommend that a file or
                          class name and description of purpose be included on
                          the same "printed page" as the copyright notice for
                          easier identification within third-party archives.
                          <br /> Copyright [yyyy] [name of copyright owner]{" "}
                          <br />
                          Licensed under the Apache License, Version 2.0 (the
                          "License"); you may not use this file except in
                          compliance with the License. You may obtain a copy of
                          the License at
                          http://www.apache.org/licenses/LICENSE-2.0 Unless
                          required by applicable law or agreed to in writing,
                          software distributed under the License is distributed
                          on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
                          OF ANY KIND, either express or implied. See the
                          License for the specific language governing
                          permissions and limitations under the License.
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="sil" tw="mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      2. SIL Open Font License
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Version 1.1 - 26 February 2007
                    </Paragraph>
                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          PREAMBLE
                        </Paragraph>
                        <Paragraph>
                          The goals of the Open Font License (OFL) are to
                          stimulate worldwide development of collaborative font
                          projects, to support the font creation efforts of
                          academic and linguistic communities, and to provide a
                          free and open framework in which fonts may be shared
                          and improved in partnership with others. <br />
                          The OFL allows the licensed fonts to be used, studied,
                          modified and redistributed freely as long as they are
                          not sold by themselves. The fonts, including any
                          derivative works, can be bundled, embedded,
                          redistributed and/or sold with any software provided
                          that any reserved names are not used by derivative
                          works. The fonts and derivatives, however, cannot be
                          released under any other type of license. The
                          requirement for fonts to remain under this license
                          does not apply to any document created using the fonts
                          or their derivatives.
                        </Paragraph>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          DEFINITIONS
                        </Paragraph>

                        <Paragraph>
                          "Font Software" refers to the set of files released by
                          the Copyright Holder(s) under this license and clearly
                          marked as such. This may include source files, build
                          scripts and documentation. <br />
                          "Reserved Font Name" refers to any names specified as
                          such after the copyright statement(s). <br />
                          "Original Version" refers to the collection of Font
                          Software components as distributed by the Copyright
                          Holder(s). <br />
                          "Modified Version" refers to any derivative made by
                          adding to, deleting, or substituting -- in part or in
                          whole -- any of the components of the Original
                          Version, by changing formats or by porting the Font
                          Software to a new environment. <br />
                          "Author" refers to any designer, engineer, programmer,
                          technical writer or other person who contributed to
                          the Font Software.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          PERMISSION & CONDITIONS
                        </Paragraph>
                        <Paragraph>
                          Permission is hereby granted, free of charge, to any
                          person obtaining a copy of the Font Software, to use,
                          study, copy, merge, embed, modify, redistribute, and
                          sell modified and unmodified copies of the Font
                          Software, subject to the following conditions:
                        </Paragraph>

                        <Paragraph>
                          1) Neither the Font Software nor any of its individual
                          components, in Original or Modified Versions, may be
                          sold by itself. <br />
                          2) Original or Modified Versions of the Font Software
                          may be bundled, redistributed and/or sold with any
                          software, provided that each copy contains the above
                          copyright notice and this license. These can be
                          included either as stand-alone text files,
                          human-readable headers or in the appropriate
                          machine-readable metadata fields within text or binary
                          files as long as those fields can be easily viewed by
                          the user. <br />
                          3) No Modified Version of the Font Software may use
                          the Reserved Font Name(s) unless explicit written
                          permission is granted by the corresponding Copyright
                          Holder. This restriction only applies to the primary
                          font name as presented to the users. <br />
                          4) The name(s) of the Copyright Holder(s) or the
                          Author(s) of the Font Software shall not be used to
                          promote, endorse or advertise any Modified Version,
                          except to acknowledge the contribution(s) of the
                          Copyright Holder(s) and the Author(s) or with their
                          explicit written permission. <br />
                          5) The Font Software, modified or unmodified, in part
                          or in whole, must be distributed entirely under this
                          license, and must not be distributed under any other
                          license. The requirement for fonts to remain under
                          this license does not apply to any document created
                          using the Font Software.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          TERMINATION
                        </Paragraph>
                        <Paragraph>
                          This license becomes null and void if any of the above
                          conditions are not met.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          DISCLAIMER
                        </Paragraph>
                        <Paragraph>
                          THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT
                          WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                          BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
                          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
                          OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO
                          EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
                          CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY
                          GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR
                          CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF
                          CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE
                          USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
                          OTHER DEALINGS IN THE FONT SOFTWARE.
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="ubuntu" tw="mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      3. Ubuntu Font License
                    </SubHeading>
                    <Paragraph tw="mb-4">Version 1.1</Paragraph>

                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Preamble
                        </Paragraph>
                        <Paragraph>
                          This licence allows the licensed fonts to be used,
                          studied, modified and redistributed freely. The fonts,
                          including any derivative works, can be bundled,
                          embedded, and redistributed provided the terms of this
                          licence are met. The fonts and derivatives, however,
                          cannot be released under any other licence. The
                          requirement for fonts to remain under this licence
                          does not require any document created using the fonts
                          or their derivatives to be published under this
                          licence, as long as the primary purpose of the
                          document is not to be a vehicle for the distribution
                          of the fonts.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Definitions
                        </Paragraph>
                        <Paragraph>
                          "Font Software" refers to the set of files released by
                          the Copyright Holder(s) under this licence and clearly
                          marked as such. This may include source files, build
                          scripts and documentation. <br />
                          "Original Version" refers to the collection of Font
                          Software components as received under this licence.{" "}
                          <br />
                          "Modified Version" refers to any derivative made by
                          adding to, deleting, or substituting — in part or in
                          whole — any of the components of the Original Version,
                          by changing formats or by porting the Font Software to
                          a new environment. <br />
                          "Copyright Holder(s)" refers to all individuals and
                          companies who have a copyright ownership of the Font
                          Software. <br />
                          "Substantially Changed" refers to Modified Versions
                          which can be easily identified as dissimilar to the
                          Font Software by users of the Font Software comparing
                          the Original Version with the Modified Version. <br />
                          To "Propagate" a work means to do anything with it
                          that, without permission, would make you directly or
                          secondarily liable for infringement under applicable
                          copyright law, except executing it on a computer or
                          modifying a private copy. Propagation includes
                          copying, distribution (with or without modification
                          and with or without charging a redistribution fee),
                          making available to the public, and in some countries
                          other activities as well.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Permission & Conditions
                        </Paragraph>
                        <Paragraph
                          tw="whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: `This licence does not grant any rights under trademark law and all such rights are reserved.

                            Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to propagate the Font Software, subject to the below conditions:
                            
                            1.    Each copy of the Font Software must contain the above copyright notice and this licence. These can be included either as stand-alone text files, human-readable headers or in the appropriate machine-readable metadata fields within text or binary files as long as those fields can be easily viewed by the user.
                            
                            2.    The font name complies with the following:
                            
                            a.    The Original Version must retain its name, unmodified.
                            
                            b.    Modified Versions which are Substantially Changed must be renamed to avoid use of the name of the Original Version or similar names entirely.
                            
                            c.     Modified Versions which are not Substantially Changed must be renamed to both
                            
                                                          i.        Retain the name of the Original Version and
                            
                                                         ii.        Add additional naming elements to distinguish the Modified Version from the Original Version. The name of such Modified Versions must be the name of the Original Version, with "derivative X" where X represents the name of the new work, appended to that name.
                            
                            3.    The name(s) of the Copyright Holder(s) and any contributor to the Font Software shall not be used to promote, endorse or advertise any Modified Version, except
                            
                            a.    as required by this licence,
                            
                            b.    to acknowledge the contribution(s) of the Copyright Holder(s) or
                            
                            c.     with their explicit written permission.
                            
                            4.    The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this licence, and must not be distributed under any other licence. The requirement for fonts to remain under this licence does not affect any document created using the Font Software, except any version of the Font Software extracted from a document created using the Font Software may only be distributed under this licence.`,
                          }}
                        />
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Termination
                        </Paragraph>
                        <Paragraph>
                          This licence becomes null and void if any of the above
                          conditions are not met.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Disclaimer
                        </Paragraph>
                        <Paragraph>
                          THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT
                          WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                          BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
                          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
                          OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO
                          EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY
                          CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY
                          GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR
                          CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF
                          CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE
                          USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
                          OTHER DEALINGS IN THE FONT SOFTWARE.
                        </Paragraph>

                        <Paragraph>
                          Ubuntu Font Licence Version 1.0 (plain text) <br />
                          The Ubuntu Font Family is presently distributed under
                          the Ubuntu Font Licence. This means you can use the
                          font in much the same way as you would use any other
                          font (open or proprietary). The open means that in the
                          long run, the font can continue to be expanded,
                          because the raw source code (design files) for the
                          font itself are available to those who are interested.{" "}
                          <br />
                          You are most welcome to use the Ubuntu Font Family, in
                          your documents, graphic designs, logos, or company
                          stationary. We'd like as many people as possible to
                          have a better quality reading experience everyday.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          For those wishing to alter or expand the font itself
                        </Paragraph>
                        <Paragraph>
                          The present Ubuntu Font Licence 1.0 is loosely
                          inspired from the SIL Open Font Licence (OFL) version
                          1.1. Using the Ubuntu Font Licence 1.0 is an interim
                          solution and the choice of licence will likely change
                          as alternative licences become available in the
                          future.
                        </Paragraph>
                        <Paragraph>
                          Note that the Ubuntu Font Licence and the SIL Open
                          Font Licence are not identical (view the differences)
                          and should not be confused with each other. Please
                          read the terms precisely and read through the FAQ for
                          more details. In order to properly license your font
                          derivative under the Ubuntu Font Licence you should:
                        </Paragraph>

                        <ul>
                          <ListItem>
                            Add your copyright information into the dedicated
                            placeholders in copyright.txt at the top of your
                            file tree, modelled on the example included in this
                            tree. (Never remove existing copyright notices.)
                          </ListItem>
                          <ListItem>
                            Include a copy of the ubuntu-font-licence-1.0.txt
                            from this tree
                          </ListItem>
                          <ListItem>
                            Put the text from copyright.txt with the
                            placeholders properly filled-in at the top of any
                            files, to be explicit about ownership and licensing
                            for those files in particular. Fonts in both object
                            and sources have dedicated metadata fields to hold
                            author and licence details, you should make use of
                            these to include the relevant information.
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default FontPolicy;
