<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:fo="http://www.w3.org/1999/XSL/Format">

  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/comanda">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="simple" page-height="29.7cm" page-width="21cm">
          <fo:region-body margin="2cm"/>
        </fo:simple-page-master>
      </fo:layout-master-set>

      <fo:page-sequence master-reference="simple">
        <fo:flow flow-name="xsl-region-body">

          <!-- Encapçalament -->
          <fo:block font-size="16pt" font-weight="bold" space-after="10pt">
            Comanda número: <xsl:value-of select="@num"/>
          </fo:block>

          <fo:block font-size="12pt" space-after="20pt">
            Hora: <xsl:value-of select="@hora"/>
          </fo:block>

          <!-- TAULA amb ítems -->
          <fo:table table-layout="fixed" width="100%" font-size="11pt" space-after="20pt">
            <fo:table-column column-width="10%"/>
            <fo:table-column column-width="70%"/>
            <fo:table-column column-width="20%"/>

            <fo:table-body>
              <xsl:for-each select="item">
                <fo:table-row>
                  <fo:table-cell>
                    <fo:block text-align="center">
                      <xsl:value-of select="@quantitat"/>
                    </fo:block>
                  </fo:table-cell>
                  <fo:table-cell>
                    <fo:block>
                      <xsl:value-of select="@nom"/>
                    </fo:block>
                  </fo:table-cell>
                  <fo:table-cell>
                    <fo:block text-align="right">
                      <xsl:value-of select="@preu"/> €
                    </fo:block>
                  </fo:table-cell>
                </fo:table-row>
              </xsl:for-each>
            </fo:table-body>
          </fo:table>

          <!-- Total -->
          <fo:block font-size="12pt" font-weight="bold" text-align="right">
            Total: <xsl:value-of select="@preu"/> €
          </fo:block>

        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
</xsl:stylesheet>
