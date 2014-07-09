/*
 * Copyright (c) 2013-2014 Minkyu Lee. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains the
 * property of Minkyu Lee. The intellectual and technical concepts
 * contained herein are proprietary to Minkyu Lee and may be covered
 * by Republic of Korea and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Minkyu Lee (niklaus.lee@gmail.com).
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, regexp: true */
/*global define, $, _, window, appshell, staruml */

define(function (require, exports, module) {
    "use strict";

    var AppInit           = staruml.getModule("utils/AppInit"),
        Core              = staruml.getModule("core/Core"),
        PreferenceManager = staruml.getModule("preference/PreferenceManager");

    var javaPreferences = {
        "java.gen": {
            text: "Java Code Generation",
            type: "Section"
        },
        "java.gen.javaDoc": {
            text: "Generate JavaDoc",
            type: "Check",
            default: true
        },
        "java.gen.useTab": {
            text: "Use Tab for indentation",
            type: "Check",
            default: false
        },
        "java.gen.indentSpaces": {
            text: "Number of spaces for indentation",
            type: "Number",
            default: 4
        },
        "java.gen.headerComment": {
            text: "Generate header comments",
            type: "Check",
            default: true
        },
        "java.rev": {
            text: "Java Reverse Engineering",
            type: "Section"
        },
        "java.rev.association": {
            text: "Reverse Java Fields as UML Associations",
            type: "Check",
            default: true
        },
        "java.rev.publicOnly": {
            text: "Reverse public members only",
            type: "Check",
            default: false
        },
        "java.rev.typeHierarchy": {
            text: "Create a type hierarchy diagram",
            type: "Check",
            default: true
        },
        "java.rev.packageOverview": {
            text: "Create overview diagram for each package",
            type: "Check",
            default: true
        },
        "java.rev.packageStructure": {
            text: "Create a package structure diagram",
            type: "Check",
            default: true
        }
    };

    function getGenOptions() {
        return {
            javaDoc       : PreferenceManager.get("java.gen.javaDoc"),
            useTab        : PreferenceManager.get("java.gen.useTab"),
            indentSpaces  : PreferenceManager.get("java.gen.indentSpaces"),
            headerComment : PreferenceManager.get("java.gen.headerComment")
        };
    }

    function getRevOptions() {
        return {
            association      : PreferenceManager.get("java.rev.association"),
            publicOnly       : PreferenceManager.get("java.rev.publicOnly"),
            typeHierarchy    : PreferenceManager.get("java.rev.typeHierarchy"),
            packageOverview  : PreferenceManager.get("java.rev.packageOverview"),
            packageStructure : PreferenceManager.get("java.rev.packageStructure")
        };
    }

    AppInit.htmlReady(function () {
        PreferenceManager.register("java", "Java", javaPreferences);
    });

    exports.getGenOptions = getGenOptions;
    exports.getRevOptions = getRevOptions;

});