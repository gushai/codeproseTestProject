//Codeprose

// Debug helper. True prints the function names as they are called.
var tooltip_Debug = false;
/**
 * Generates the html the content for a tooltip entry of an code element.
 * @param 	{object} 	elem	Dom element. 
 * @return 	{String}			Div containing the generated elements.
 */
function createTooltipHtmlFromDataAttr(elem) { 

	var fullname = "<b>" + $(elem).data("cp-fullname") + "</b>";

	var typeId = $(elem).data("cp-typeid")

	var linkToDeclaration = tooltipSrcFile_getLinkToDeclaration(elem);

	var linkToWhereUsedInProject = tooltipSrcFile_getLinkToWhereTypeUsedInProject(typeId)

	var typeInfo = typeInformation[typeId];
	var typeSummary = tooltipSrcFile_getTypeInformation(typeInfo);

	var typeOverview = tooltipSrcFile_getLinkToTypeOverview(typeId);

	var typeOwner = tooltipSrcFile_getOwnerTypeInformation(elem);

	var implicitSummary = tooltipSrcFile_getImplicitInformation(elem);

	// Output structure 
	var html = "<div class='cp-tooltip'>" + fullname + "" +
	linkToDeclaration +
	typeSummary +
	typeOverview + 
	typeOwner + 
	implicitSummary + 
	linkToWhereUsedInProject +
	"</div>";

	return html;
}

//Tooltip helpers

/**
 * Generates a the link to the element's declaration.
 * @param 	{object}	elem	Dom element.
 * @return	{String}			Empty string if no link found, else div with link to declaration.
 */
function tooltipSrcFile_getLinkToDeclaration(elem){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getLinkToDeclaration"); }

	var rawLinkToDeclaration = $(elem).data("cp-declaration");
	var linkToDeclaration = ""
		if(rawLinkToDeclaration){
			console.log( rawLinkToDeclaration);
			linkToDeclaration = "<div style='margin-top:0.5em;'><a href='" + rawLinkToDeclaration + "'>Declaration</a>" + "<br/></div>";
		}
	return linkToDeclaration;
}
/**
 * Generates a the link to the element's type overview.
 * @param 	{Number}	typeId 	Type id.
 * @return	{String}			Empty string if no link found, else div with link to type overview.
 */
function tooltipSrcFile_getLinkToTypeOverview(typeId){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getLinkToTypeOverview"); }
	var retString = "";
	var typeInspectInfo = typeInformation[typeId];

	if(typeInspectInfo != null){
		var typeInfo = typeInspectInfo.tpe;
		if(typeInfo.typeName === "BasicTypeInfo"){
			var rawLink = "../" + "typeInformationSummary.html#TYPEID" + typeId;
			retString = "<div style='margin-top:0.5em;'>" + "<a href='" + rawLink + "'>" + "Type overview" + "</a>" + "</div>";
		}
	}
	return retString;
}
/**
 * Generates a the link to where used in project .
 * @param 	{object}	tpyeId	Type id.
 * @return	{String}			Empty string if no link found, else div with link to where used.
 */
function tooltipSrcFile_getLinkToWhereTypeUsedInProject(typeId){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getLinkToWhereTypeUsedInProject"); }
	
	var linkToWhereUsedInProject = "";
	if(typeId != null){
		if(typeInformation[typeId]!=null){
			rawLinkToWhereUsedProject = "../whereUsedSummary.html"+ "#TYPEID" + typeId
			linkToWhereUsedInProject = "<div style='margin-top:0.5em;'>" + "<a href='" + rawLinkToWhereUsedProject + "'>Type where used in project</a>" + "</div>";
		}
	}    

	return linkToWhereUsedInProject;
}



/**
 * Generate type information entry for 
 * 	-	BasicTypeInfo
 * 	-	ArrowTypeInfo
 *  
 * @param 	{Object}	typeInspectInfo Type inspect information.
 * @return	{String}					Type summary.
 */
function tooltipSrcFile_getTypeInformation(typeInspectInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getTypeInformation"); }

	var retString = "";
	if(typeInspectInfo ==  null){
		return retString;
	}
	retString += "<div style='margin-top:0.5em;'>";
	if(typeInspectInfo.tpe.typeName === "BasicTypeInfo"){
		retString += tooltipSrcFile_getTypeInformation_BasicTypeInfo(typeInspectInfo);
	} else {
		retString += tooltipSrcFile_getTypeInformation_ArrowTypeInfo(typeInspectInfo);
	}
	retString += "</div>";	

	return retString;
}

/**
 * Generate type information entry for ArrowTypeInfo.
 * 
 * Assumes typeInspectInfo.tpe.typeName === "ArrowTypeInfo" is true.
 * 
 * @param 	{Object}	typeInspectInfo Type inspect information.
 * @return	{String}					Type summary.
 */
function tooltipSrcFile_getTypeInformation_ArrowTypeInfo(typeInspectInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getTypeInformation_ArrowTypeInfo"); }

	var retString ="";

	retString += "Arrow information:";
	retString += "<ul style='padding-left:2em;'>"
		// Parameters
		if(typeInspectInfo.tpe.paramSections != null){
			var parameterList = tooltipSrcFile_getListOfParameters(typeInspectInfo.tpe.paramSections);
			if(parameterList != ""){
				retString += "<li>Parameters:" + parameterList + "</li>";
			}
		}

	// Return type
	if(typeInspectInfo.tpe.resultType != null){

		var resultType = tooltipSrcFile_getResultType(typeInspectInfo.tpe.resultType);

		if(resultType != ""){
			retString += "<li style='margin-top:0.5em;'>Result type:" + resultType + "</li>";
		} else {
		}


	}

	retString += "</ul>"
		return retString;
}

/**
 * Generate result type information entry.
 * 
 * Assumes typeInspectInfo.tpe.typeName === "ArrowTypeInfo" is true.
 * 
 * @param 	{Object}	typeInfo 	Type information.
 * @return	{String}				Result type summary.
 */
function tooltipSrcFile_getResultType(typeInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getResultType"); }
	var retString = "";
	var retTypeName = getTypeInfoName(typeInfo);
	var retTypeId = typeInfo.typeId;
	var retTypeInspectInfo = typeInformation[retTypeId];

	if(retTypeInspectInfo != null && retTypeInspectInfo.tpe.typeName === "BasicTypeInfo"){

		var rawLink = getRawLinkToTypeDefinition(retTypeInspectInfo.tpe); 
		var declAs = typeInfo.declAs;
		if(rawLink!=""){
			retString += "<ul style='margin-top:0.5em;padding-left:1em;'>" + "<li style='margin-top:0.2em;'>" + declAs + " - " + "<a href='.." + rawLink + "'>" + retTypeName + "</a>" + "</li>" + "</ul>";
		} else {
			retString += "<ul style='margin-top:0.5em;padding-left:1em;'>" + "<li style='margin-top:0.2em;'>" + declAs + " - " + retTypeName + "</li>" + "</ul>";
		}
	} else {
		retString += "<ul style='margin-top:0.5em;padding-left:1em;'>" + "<li style='margin-top:0.2em;'>" + retTypeName + "</li>" + "</ul>";

	}

	return retString;

}

/**
 * Generates parameter list entries.
 * @param	{Object}	paramSections 	Parameter sections.
 * @return	{String}					Parameter information. 
 */
function tooltipSrcFile_getListOfParameters(paramSections){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getListOfParameters"); }
	var retString = "<ul style='margin-top:0.5em;padding-left:1em;'>";
	if(paramSections.length==0){
		retString += "<li style='margin-top:0.2em;'>" + "-" + "</li>";
	} else {
		for(var i=0;i<paramSections.length;i++){
			var params = paramSections[i];

			var implicitInd = "";
			if(params.isImplicit == true){ 
				implicitInd = " (impl)";
			}

			if(params.params.length==0){
				retString += "<li style='margin-top:0.2em;'>" + "-" + "</li>";
			} else {

				for(var k=0;k<params.params.length;k++){
					var paramName = params.params[k][0];
					var paramTypeInfo = params.params[k][1];

					var paramTypeName = getTypeInfoName(paramTypeInfo);

					var rawLinkToDef = "";
					if(paramTypeInfo.typeName === "BasicTypeInfo"){
						var typeInspectInfo = typeInformation[paramTypeInfo.typeId];
						if(typeInspectInfo != null){
							rawLinkToDef = getRawLinkToTypeDefinition(typeInspectInfo.tpe);
						}
					}
					if(rawLinkToDef!= ""){
						retString += "<li style='margin-top:0.2em;'>" + paramName + ": " + "<a href='.." + rawLinkToDef + "'>" + paramTypeName + "</a>" + implicitInd +"</li>";
					} else {
						retString += "<li style='margin-top:0.2em;'>" + paramName + ": " + paramTypeName + implicitInd +"</li>";
					}


				}
			}
		}
	}
	retString += "</ul>";
	return retString;
}

/**
 * Generate type information entry for BasicTypeInfo.
 * 
 * Assumes typeInspectInfo.tpe.typeName === "BasicTypeInfo" is true.
 * 
 * @param 	{Object}	typeInspectInfo Type inspect information.
 * @return	{String}					Type summary.
 */
function tooltipSrcFile_getTypeInformation_BasicTypeInfo(typeInspectInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getTypeInformation_BasicTypeInfo"); }		

	var retString = "";
	retString += "Type information:" + "<ul style='margin-left:0em;padding-left:2em;'>";

	var declaredAs = typeInspectInfo.tpe.declAs;
	
	var rawLinkToTypeDef = getRawLinkToTypeDefinition(typeInspectInfo.tpe);	

	if(rawLinkToTypeDef != ""){
		retString += "<li>" + declaredAs + " - " + "<a href='.." + rawLinkToTypeDef + "'>Definition</a>"  + "<li/>";
	} else {
		retString += "<li>" + declaredAs + " - Def. outside project" + "</li>"; 
	}

	// Implemented interfaces:
	var interfaceList = tooltipSrcFile_getListOfInterfaces(typeInspectInfo.interfaces);
	if(interfaceList != ""){
		retString += "<li style='margin-top:0.5em;'>" + "Implements:" + interfaceList + "</li>";	
	}

	// Outer type
	if(typeInspectInfo.tpe.outerTypeId!=null){
		var outerTypeId = typeInspectInfo.tpe.outerTypeId;
		var outerTypeInspectInfo = typeInformation[outerTypeId];
		if(outerTypeInspectInfo.tpe != null && outerTypeInspectInfo.tpe.typeName === "BasicTypeInfo"){

			var outerTypeList = tooltipSrcFile_getOuterTypeInformation(outerTypeInspectInfo.tpe);
			retString += "<li style='margin-top:0.5em;'>" + "Outer type: " + outerTypeList + "</li>";
		}
	}

	// Companion 
	if(typeInspectInfo.companionId != null){

		var companionInfo = tooltipSrcFile_getCompanionObjectInformation(typeInspectInfo);
		if(companionInfo != ""){
			retString += "<li style='margin-top:0.5em;'>" + "Companion: " + companionInfo + "</li>";
		}
	} 

	retString += "</ul>";

	return retString;
}

/**
 * Generates companion object information.
 * @param 	{Object}	typeInspectInfo	Type inspect information.
 * @return	{String}					Name and link (if source position in project) to
 * 										companion object.
 * 				
 */
function tooltipSrcFile_getCompanionObjectInformation(typeInspectInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getCompanionObjectInformation"); } 	

	var retString = "";
	if(typeInspectInfo.companionId != null){

		var companionInspectInfo = typeInformation[typeInspectInfo.companionId];
		if(companionInspectInfo != null && companionInspectInfo.tpe.typeName === "BasicTypeInfo") {
			var typeInfo = companionInspectInfo.tpe;
			var declAs = typeInfo.declAs;
			var n = getTypeInfoName(typeInfo);
			var rawLink = getRawLinkToTypeDefinition(typeInfo);

			if(rawLink!=""){
				retString += "<ul style='margin-left:0em;padding-left:1em;'><li style='margin-top:0.5em;'>" + declAs + " - " + "<a href='.." + rawLink + "'>"+ n + "</a></li></ul>";
			} else {
				retString += "<ul style='margin-left:0em;padding-left:1em;'><li style='margin-top:0.5em;'>" + declAs + " - " + n + "</li></ul>";
			}

		}
	} 

	return retString;
}


/**
 * Generates outer type information.
 * @param	{Object}	basicTypeInfo	Basic type information.	
 * @return	{String}					Declared as, name and link to definition (if defined in project) 
 * 										of outer type
 */
function tooltipSrcFile_getOuterTypeInformation(basicTypeInfo){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getOuterTypeInformation"); } 
	var retString = "";
	var outerTypeName = getTypeInfoName(basicTypeInfo);
	var outerTypeRawLink = getRawLinkToTypeDefinition(basicTypeInfo);
	var outerTypeDeclAs = basicTypeInfo.declAs;

	if(outerTypeRawLink!=""){
		retString += "<ul style='margin-left:0em;padding-left:1em;'><li style='margin-top:0.5em;'>" + outerTypeDeclAs + " - " + "<a href='.." + outerTypeRawLink + "'>"+ outerTypeName + "</a></li></ul>";
	} else {
		retString += "<ul style='margin-left:0em;padding-left:1em;'><li style='margin-top:0.5em;'>" + outerTypeDeclAs + " - " + outerTypeName + "</li></ul>";
	}
	return retString;
}



/**
 * Generates list of implemented interfaces.
 * @param 	{Object}	interfaceInfos	Array of InterfaceInfo objects.
 * @return	{String}					List of interfaces with declared as, name and link to interface 
 * 										defintion if in project.
 */
function tooltipSrcFile_getListOfInterfaces(interfaceInfos){
	if(tooltip_Debug){ console.log("tooltipSrcFile_getListOfInterfaces"); }

	var retString = "";
	if(interfaceInfos!=null && interfaceInfos.length>0){
		retString += "<ul style='margin-left:0em;padding-left:1em;'>";
		for(var i=0; i<interfaceInfos.length;i++){
			var typeInfo=interfaceInfos[i].tpe;

			var intFaceName = getTypeInfoName(typeInfo)	
			var intFaceDeclAs = typeInfo.declAs;
			var intFaceDefLink = getRawLinkToTypeDefinition(typeInfo);			
			if(intFaceDefLink != ""){
				retString += "<li style='margin-top:0.2em;'>" + intFaceDeclAs + " - " + "<a href='.." + intFaceDefLink + "'>" +intFaceName + "</a>" +"</li>";
			} else {
				retString += "<li  style='margin-top:0.2em;'>" + intFaceDeclAs + " - " + intFaceName + "</li>";
			}


		}
		retString += "</ul>";
	}

	return retString;

}

/*
 * Returns information on implicit conversions and parameters. 
 */
/**
 * Generates implicit information for a dom element.
 * @param 	{Object} 	elem	Dom element.
 * @return	{String}			List of implicit conversions and implicit parameters applied.		
 */
function tooltipSrcFile_getImplicitInformation(elem){

	if(tooltip_Debug){ console.log("tooltipSrcFile_getImplicitInformation"); }

	var hasImplicitConversions = $(elem).data("cp-implicitconversion");
	var hasImplicitParameters = $(elem).data("cp-implicitparameter");
	var retString = "";

	if(hasImplicitConversions){
		var implicitConversionids = $(elem).data("cp-implicitconversionids");

		if(implicitConversionids != null){

			var implicitConversionList = tooltipSrcFile_implicitConversion(implicitConversionids);

			if(implicitConversionids!=null){
				retString += "<div style='margin-top:0.5em;'>" + "Impl. Conversion(s):" + implicitConversionList + "</div>";
			}
		}
	}


	if(hasImplicitParameters){
		var implicitParameterids = $(elem).data("cp-implicitparameterids");

		if(implicitParameterids != null){
			var implicitParamList = tooltipSrcFile_implicitParameter(implicitParameterids);
			if(implicitParamList!=null){
				retString += "<div style='margin-top:0.5em;'>" + "Impl. Parameter(s):" + implicitParamList + "</div>";
			}
		}
	}

	return retString;
}

/**
 * Generates implicit conversion information.
 * @param 	{Array[Number]}	implicitConversionIds 	Array of implicit converison ids applied. The ids are used to reference implictConversions.
 * @return	{String}								List of implicit conversions applied. Each entry: Name and if definition within project link to definition.
 */
function tooltipSrcFile_implicitConversion(implicitConversionIds){

	if(tooltip_Debug){ console.log("tooltipSrcFile_implicitConversion"); }

	var retString = "<ul style='margin-top:0.3em;margin-left:0em;padding-left:2em;'>";
	for(var i=0;i<implicitConversionIds.length;i++){

		var implConvInfo = implicitConversions[implicitConversionIds[i]];

		var n  = implConvInfo.fun.name
		var rawLink = "";
		if(implConvInfo.fun.declPos != null){
			rawLink = getRawLinkToDeclaration(implConvInfo.fun.declPos);
		}
		if(rawLink!=""){
			retString += "<li style='margin-top:0.3em;'>" + "<a href='.." + rawLink + "'>" + n + "</a>" + "</li>";	
		} else {
			retString += "<li style='margin-top:0.3em;'>" + n + "</li>";	
		}

	}


	retString += "</ul>";
	return retString;
}

/**
 * Generates implicit parameter information.
 * @param 	{Array[Number]}	implicitParameterIds 	Array of implicit parameter ids applied. The ids are used to reference implictParameters.
 * @return	{String}								List of implicit parameters applied. Each entry: Name and if definition within project link to definition.
 */
function tooltipSrcFile_implicitParameter(implicitParameterIds){
	if(tooltip_Debug){ console.log("tooltipSrcFile_implicitParameter"); }
	console.log(implicitParameterIds);

	var retString = "<ul style='margin-top:0.3em;margin-left:0em;padding-left:2em;'>";

	for(var i=0;i<implicitParameterIds.length;i++){

		var implParaInfo = implicitParameters[implicitParameterIds[i]];

		console.log(implParaInfo);
		var params = implParaInfo.params;
		for(var k=0;k<params.length;k++) {
			var n = params[k].name;
			var rawLinkToParamDecl = "";
			if(params[k].declPos!=null){
				rawLinkToParamDecl = getRawLinkToDeclaration(params[k].declPos);					
			}

			var typeInfo = params[k].tpe;
			var typeName = "";
			var typeDeclAs = "";
			var rawLinkToTypeDef = "";

			if(typeInfo!=null){
				typeName = getTypeInfoName(typeInfo);
				if(typeInfo.typeName === "BasicTypeInfo"){
					typeDeclAs = typeInfo.declAs;
					if(typeInfo.pos!=null){
						rawLinkToTypeDef = getRawLinkToDeclaration(typeInfo.pos);
					}
				} else {

				}
			}


			var entry = ""; 

			if(rawLinkToParamDecl!=""){
				entry += "<a href='.." + rawLinkToParamDecl + "'>" + n + "</a>";
			} else {
				entry += n;
			}

			if(typeDeclAs!=""){
				entry += " - " + typeDeclAs;
			}
			
			if(rawLinkToTypeDef!=""){
				entry += " - <a href='.." + rawLinkToTypeDef + "'>" + typeName + "</a>";
			} else {
				entry += " - " + typeName;
			}

			retString += "<li>" + entry + "</li>";
		}

	}
	retString += "</ul>";
	return retString;
} 

/**
 * Generates owner type information.
 * @param	{Object}	elem	Dom element.
 * @return	{String} 			Name and link (if definition within project) to owning type.
 */
function tooltipSrcFile_getOwnerTypeInformation(elem){

	if(tooltip_Debug){ console.log("tooltipSrcFile_getOwnerTypeInformation"); }

	var ownerTypeId = $(elem).data("cp-ownertypeid");
	var retString = "";
	if(ownerTypeId!=null){
		var typeInspectInfo = typeInformation[ownerTypeId];
		if(typeInspectInfo != null){

			retString += "<div style='margin-top:0.5em;'>" + "Owner type:";
			var typeInfo = typeInspectInfo.tpe;
			var fullname = getTypeInfoName(typeInfo);
			var rawLinkToDef = "";

			if(typeInfo.typeName === "BasicTypeInfo"){
				rawLinkToDef = getRawLinkToTypeDefinition(typeInfo);			
			}

			if(rawLinkToDef != ""){
				retString += "<div style='margin-top:0.5em;padding-left:2em;'><a href='.." + rawLinkToDef + "'>" + fullname + "</a>" + "</div>";
			} else {
				retString += "<div style='margin-top:0.5em;padding-left:2em;'>" + fullname + "</div>";
			}

			retString += "</div>";			 		


		}
	} 

	return retString;
}

/**
 * Returns the link to the type definition.
 * @param 	{Object}	basicTypeInfo	Basic type information.
 * @return	{String}					If source position of defintion within project "/content/srcFile.scala.html#T<ID>" else "" 
 */
function getRawLinkToTypeDefinition(basicTypeInfo){

	var rawLink = "";
	if(basicTypeInfo!=null && basicTypeInfo.pos != null){
		var srcFileLink = srcFileToRelLink[basicTypeInfo.pos.filename];
		var tokenId = basicTypeInfo.pos.tokenId;

		if(srcFileLink != null && tokenId != -1){
			rawLink = srcFileLink + "#T" + tokenId;		
		}
	}

	return rawLink;
}


/**
 * Returns a link based on a OffsetSourcePositionWithTokenId.
 * 
 * Assumes declPos != null
 * 
 * @param	{Object}	declPos	OffsetSourcePositionWithTokenId
 * @return	{String}			If source file within project and tokenId!=-1 "/content/srcFile.scala.html#T<ID>" else ""
 */
function getRawLinkToDeclaration(declPos){
	var retString = "";
	var filename = declPos.filename;
	var tokenId = declPos.tokenId;
	if(filename != null && tokenId != -1){
		var rawLink = srcFileToRelLink[filename];
		if(rawLink!=null){
			retString = rawLink + "#T" + tokenId;
		}
	}
	return retString;
}

/**
 * Returns name from TypeInfo
 * @param	{Object}	typeInfo	TypeInfo
 * return	{String}				Name based on the typeInfo type BasicTypeInfo vs ArrowTypeInfo.
 */
function getTypeInfoName(typeInfo){
	var n = "";
	if(typeInfo.typeName === "BasicTypeInfo"){
		n=typeInfo.fullName;	
	} else {
		n=typeInfo.name;
	}
	return n;
}